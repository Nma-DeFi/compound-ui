import Compound from "@compound-finance/compound-js";
import { Address, mainnet } from "wagmi";
import { cometAbi } from "../abi/cometAbi";
import { PublicClient } from "viem";
import { PriceFeed, PriceFeedKind } from "../types";

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

        const price = Number(feedPrice) / Number(feedScale)

        return (kind === PriceFeedKind.ETH_PRICE) ? price * ethPrice : price
    }

}