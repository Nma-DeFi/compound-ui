import Compound from "@compound-finance/compound-js";
import { Address, mainnet } from "wagmi";
import { cometAbi } from "../abi/cometAbi";
import { PublicClient } from "viem";

type CompoundSdk = { getPrice: (token: string) => Promise<number> }

export class PriceService {

    publicClient: PublicClient
    compoundSdk: CompoundSdk
    cometContract

    constructor( args? : { publicClient?: PublicClient, comet?: Address}) {
        const [ rpc ] = mainnet.rpcUrls.default.http
        this.compoundSdk = new (Compound as any)(rpc)
        if (args?.publicClient && args?.comet) {
            this.publicClient = args.publicClient
            this.cometContract = { address: args.comet, abi: cometAbi }
        }
    }

    async getPriceFromSymbol(symbol: string) {
        const SYMBOL_MAP = { 'WETH': 'ETH' }
        const mappedSymbol = SYMBOL_MAP[symbol] || symbol
        const price = await this.compoundSdk.getPrice(mappedSymbol)
        console.log(
            'PriceService.getPriceFromSymbol',
            'token', mappedSymbol,
            'price', price
        )
        return price
    }

    async getPriceFromFeed(feed: Address) {

        const [ price, scale ] = await this.publicClient.multicall({
            contracts: [
                {
                    ...this.cometContract,
                    functionName: 'getPrice',
                    args: [ feed ],
                },
                {
                    ...this.cometContract,
                    functionName: 'priceScale',
                }
            ],
            allowFailure: false,
        })

        console.log('getPriceFromFeed', feed, price, scale)

        return Number(price) / Number(scale)
    }

}