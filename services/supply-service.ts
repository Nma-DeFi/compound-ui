import { encodeAbiParameters, maxUint256 } from "viem";
import { bulkerAbi } from "../abi/bulkerAbi";
import { cometAbi } from "../abi/cometAbi";
import { CompoundConfig } from "../compound-config";
import { bnf, toBigInt } from "../utils/bn";
import { nativeCurrency } from "../utils/chains";

export class SupplyService {

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

    async supplyErc20Token({ token, amount, maxed = false }) {
        const { address: asset, decimals } = token
        const supplyAmount = maxed ? maxUint256 : toBigInt(amount, decimals)

        console.log(
            Date.now(),
            'SupplyService.supplyErc20Token',
            'token', asset,
            'amount', bnf(amount),
            'maxed', maxed,
            'account', this.account
        )

        const { request } = await this.publicClient.simulateContract({
            ...this.cometContract,
            functionName: 'supply',
            args: [asset, supplyAmount],
            account: this.account
        })
        
        return await this.walletClient.writeContract(request)
    }

    async supplyNativeCurrency({ amount, maxed = false }) {
        const chainId = await this.publicClient.getChainId()
        const { symbol, decimals } = nativeCurrency(chainId)
        const { bulker: bulkerAddress } = CompoundConfig[chainId].contracts
        const bulkerContract = { address: bulkerAddress, abi: bulkerAbi }
        const supplyAmount = toBigInt(amount, decimals)

        console.log(
            Date.now(),
            'SupplyService.supplyNativeCurrency',
            'account', this.account,
            'amount', bnf(amount),
            'maxed', maxed,
            'currency', symbol,
            'contract', bulkerContract
        )

        const supplyAction = await this.publicClient.readContract({
            ...bulkerContract,
            functionName: 'ACTION_SUPPLY_NATIVE_TOKEN',
        })

        const supplyParameters = encodeAbiParameters(
            [
              { name: 'comet', type: 'address' },
              { name: 'to', type: 'address' },
              { name: 'amount', type: 'uint' },
            ],
            [ 
                this.cometContract.address, 
                this.account,
                (maxed ? maxUint256 : supplyAmount),
            ]
        )

        const { request } = await this.publicClient.simulateContract({
            ...bulkerContract,
            account: this.account,
            value: supplyAmount,
            functionName: 'invoke',
            args: [[ supplyAction ], [ supplyParameters ]]
        })

        return await this.walletClient.writeContract(request)
    }

}