import { cometAbi } from "../abi/cometAbi";
import { toBigInt } from "../utils/bn";

export class WithdrawService {

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

    async withdraw({ token, amount }) {
        const { address: asset, decimals } = token
        const _amount = toBigInt(amount, decimals)
        console.log(
            'WithdrawService.withdraw',
            'token', asset,
            'amount', _amount,
            'account', this.account
        )
        const { request } = await this.publicClient.simulateContract({
            ...this.contract,
            functionName: 'withdraw',
            args: [asset, _amount],
            account: this.account
        })
        return await this.walletClient.writeContract(request)
    }

}