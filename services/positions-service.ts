import { cometAbi } from "../abi/cometAbi";
import { fromBigInt } from "../utils/bn";

export class PositionsService {

    publicClient
    contract

    constructor({ publicClient, comet }) {
        this.publicClient = publicClient
        this.contract = {
            address: comet,
            abi: cometAbi
        }
    }

    async supplyBalanceOf(account) {
        const balance = await this.publicClient.readContract({
            ...this.contract,
            functionName: 'balanceOf',
            args: [ account ],
        })
        const decimals = await this.publicClient.readContract({
            ...this.contract,
            functionName: 'decimals',
        })
        console.log(
            Date.now(), 
            'PositionsService.supplyBalanceOf',
            'account', account,
            'comet', this.contract.address,
            'balance', balance,
            'decimals', decimals,
        )
        return fromBigInt(balance, decimals)
    }
}