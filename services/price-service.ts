import Compound from "@compound-finance/compound-js";

export class PriceService {

    compound: { getPrice: (token: string) => Promise<number> }

    constructor() {
        this.compound = new (Compound as any)(process.env.NEXT_PUBLIC_MAINNET_RPC)
    }

    async getPrice(token: string) {
        const token_ = this.mapToken(token)
        const price = await this.compound.getPrice(token_)
        console.log(
            'PriceService.getPrice',
            'token', token_,
            'price', price
        )
        return price
    }

    mapToken(token: string) {
        const mapping = {
            'WETH': 'ETH',
        }
        return mapping[token] || token
    }
}