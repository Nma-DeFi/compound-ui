import { cometAbi } from "../abi/cometAbi";
import { fromBigInt, toBigInt } from "../utils/bn";

export class SupplyService {

    publicClient
    walletClient
    account
    contract

    constructor({ publicClient, walletClient, account, comet }) {
        this.publicClient = publicClient
        this.walletClient = walletClient
        this.account = account
        this.contract = {
            address: comet,
            abi: cometAbi
        }
    }

    async supply({ token, amount }) {
        const { address: asset, decimals } = token
        const _amount = toBigInt(amount, decimals)
        console.log(
            'SupplyService.supply',
            'token', asset,
            'amount', _amount,
            'account', this.account
        )
        const { request } = await this.publicClient.simulateContract({
            ...this.contract,
            functionName: 'supply',
            args: [asset, _amount],
            account: this.account
        })
        return await this.walletClient.writeContract(request)
    }

    
    async supplyBalanceOf(account) {
        try {
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
                'SupplyService.supplyBalanceOf',
                'account', account,
                'comet', this.contract.address,
                'balance', balance,
                'decimals', decimals,
            )
            return fromBigInt(balance, decimals)
        } catch (e) {
            console.error('supplyBalanceOf err', e)
            throw e
        }
    }
}