import Compound from "@compound-finance/compound-js";
import { mainnet } from "wagmi";

export class PriceService {

    compound: { getPrice: (token: string) => Promise<number> }

    constructor() {
        const [ rpc ] = mainnet.rpcUrls.default.http
        this.compound = new (Compound as any)(rpc)
    }

    async getPrice(token: string) {
        const mappedToken = this.mapToken(token)
        const price = await this.compound.getPrice(mappedToken)
        console.log(
            'PriceService.getPrice',
            'token', mappedToken,
            'price', price
        )
        return price
    }

    mapToken(token: string) {
        const mapping = { 'WETH': 'ETH' }
        return mapping[token] || token
    }
}