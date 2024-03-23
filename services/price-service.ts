import Compound from "@compound-finance/compound-js";
import { Address, mainnet } from "wagmi";
import { cometAbi } from "../abi/cometAbi";
import { PublicClient } from "viem";
import { PriceFeed, PriceFeedKind } from "../types";

export const PRICE_STALE_TIME = 2 * 60 * 1000

type CompoundSdk = { getPrice: (token: string) => Promise<number> }

export class PriceService {

    publicClient: PublicClient
    compoundSdk: CompoundSdk
    cometContract

    constructor( args? : { publicClient: PublicClient, comet: Address}) {
        const [ rpc ] = mainnet.rpcUrls.default.http
        this.compoundSdk = new (Compound as any)(rpc)
        if (args) {
            this.publicClient = args.publicClient
            this.cometContract = { address: args.comet, abi: cometAbi }
        }
    }

    async getPriceFromSymbol(symbol: string) {
        return await this.compoundSdk.getPrice(symbol)
    }

    async getPriceFromFeed({ address, kind } : PriceFeed) {

        let promises: Promise<any>[] = [ 
            this.publicClient.multicall({
                contracts: [
                    {
                        ...this.cometContract,
                        functionName: 'getPrice',
                        args: [ address ],
                    },
                    {
                        ...this.cometContract,
                        functionName: 'priceScale',
                    }
                ],
                allowFailure: false,
            }) 
        ]

        if (kind === PriceFeedKind.ETH_PRICE) {
            promises = [...promises, this.getPriceFromSymbol('ETH')]
        }

        const [ feedPrice, feedScale, ethPrice ] = (await Promise.all(promises)).flat()

        const price = (Number(feedPrice) / Number(feedScale))

        return (kind === PriceFeedKind.ETH_PRICE) ? price * ethPrice : price
    }

    async getAllPricesFromFeeds(priceFeeds : PriceFeed[]) {

        const multicallParams = priceFeeds.map(({ address }) => ({
            ...this.cometContract,
            functionName: 'getPrice',
            args: [ address ],
        }))

        let promises: Promise<any>[] = [ 
            this.publicClient.multicall({
                contracts: [
                    {
                        ...this.cometContract,
                        functionName: 'priceScale',
                    },
                    ...multicallParams
                ],
                allowFailure: false,
            }) 
        ]

        const isEthPriceFeed = !!priceFeeds.find(priceFeed => (priceFeed.kind === PriceFeedKind.ETH_PRICE))

        if (isEthPriceFeed) {
            promises = [this.getPriceFromSymbol('ETH'), ...promises]
        }

        let prices : number[]

        if (isEthPriceFeed) {
            const [ ethPrice, [ priceScale, ...rawPrices ] ] = await Promise.all(promises)
            prices = rawPrices.map((rawPrice, index) => { 
                const price = (Number(rawPrice) / Number(priceScale)) 
                return (priceFeeds[index].kind === PriceFeedKind.ETH_PRICE) ? price * ethPrice : price
            })
        } else {
            const [ [ priceScale, ...rawPrices ] ] = await Promise.all(promises)
            prices = rawPrices.map(rawPrice => (Number(rawPrice) / Number(priceScale)))
        }

        return prices
    }

}