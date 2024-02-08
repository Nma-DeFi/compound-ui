import { encodeAbiParameters } from "viem";
import { bulkerAbi } from "../abi/bulkerAbi";
import { cometAbi } from "../abi/cometAbi";
import { CompoundConfig } from "../compound-config";
import { toBigInt } from "../utils/bn";
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

    async supplyErc20Token({ token, amount }) {
        const { address: asset, decimals } = token
        const supplyAmount = toBigInt(amount, decimals)
        console.log(
            'SupplyService.supplyErc20Token',
            'token', asset,
            'amount', supplyAmount,
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

    async supplyNativeCurrency({ amount }) {
        const chainId = await this.publicClient.getChainId()
        const { symbol, decimals } = nativeCurrency(chainId)
        const { bulker: bulkerAddress } = CompoundConfig[chainId].contracts
        const bulkerContract = { address: bulkerAddress, abi: bulkerAbi }
        const supplyAmount = toBigInt(amount, decimals)

        console.log(
            'SupplyService.supplyNativeCurrency',
            'account', this.account,
            'amount', supplyAmount,
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
                supplyAmount,
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