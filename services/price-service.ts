import Compound from "@compound-finance/compound-js";

export class PriceService {

    compound: { getPrice: (token: string) => Promise<number> }

    constructor() {
        this.compound = new (Compound as any)(process.env.NEXT_PUBLIC_MAINNET_RPC)
    }

    async getPrice(token: string) {
        const token_ = this.validateToken(token)
        console.log(
            'PriceService.getPrice',
            'token', token_,
        )
        return await this.compound.getPrice(token_)
    }

    validateToken(token: string) {
        const mapping = {
            'WETH': 'ETH',
        }
        return mapping[token] || token
    }
}