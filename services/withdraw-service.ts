import { encodeAbiParameters, maxUint256 } from "viem";
import { bulkerAbi } from "../abi/bulkerAbi";
import { cometAbi } from "../abi/cometAbi";
import { CompoundConfig } from "../compound-config";
import { bnf, toBigInt } from "../utils/bn";
import { nativeCurrency } from "../utils/chains";

export class WithdrawService {

    publicClient
    walletClient
    account
    cometContract

    constructor({ publicClient, walletClient, account, comet }) {
        this.publicClient = publicClient
        this.walletClient = walletClient
        this.account = account
        this.cometContract = {
            address: comet,
            abi: cometAbi
        }
    }
    
    async withdrawErc20Token({ token, amount, maxed = false }) {
        const { address: asset, decimals } = token
        const withdrawAmount = maxed ? maxUint256 : toBigInt(amount, decimals)

        console.log(
            Date.now(),
            'WithdrawService.withdrawErc20Token',
            'token', asset,
            'amount', bnf(amount),
            'withdrawAmount', withdrawAmount,
            'maxed', maxed,   
            'account', this.account
        )

        const { request } = await this.publicClient.simulateContract({
            ...this.cometContract,
            functionName: 'withdraw',
            args: [asset, withdrawAmount],
            account: this.account
        })

        return await this.walletClient.writeContract(request)
    }

    async withdrawNativeCurrency({ amount, maxed = false }) {
        const chainId = await this.publicClient.getChainId()
        const { symbol, decimals } = nativeCurrency(chainId)
        const { bulker: bulkerAddress } = CompoundConfig[chainId].contracts
        const bulkerContract = { address: bulkerAddress, abi: bulkerAbi }
        const withdrawAmount = maxed ? maxUint256 : toBigInt(amount, decimals)

        console.log(
            Date.now(),
            'WithdrawService.withdrawNativeCurrency',
            'account', this.account,
            'amount', bnf(amount),
            'withdrawAmount', withdrawAmount,
            'max', maxed,   
            'currency', symbol,
            'contract', bulkerContract
        )

        const withdrawAction = await this.publicClient.readContract({
            ...bulkerContract,
            functionName: 'ACTION_WITHDRAW_NATIVE_TOKEN',
        })

        const withdrawParameters = encodeAbiParameters(
            [
              { name: 'comet', type: 'address' },
              { name: 'to', type: 'address' },
              { name: 'amount', type: 'uint' },
            ],
            [ 
                this.cometContract.address, 
                this.account,
                withdrawAmount,
            ]
        )

        const { request } = await this.publicClient.simulateContract({
            ...bulkerContract,
            account: this.account,
            functionName: 'invoke',
            args: [[ withdrawAction ], [ withdrawParameters ]]
        })

        return await this.walletClient.writeContract(request)
    }

}