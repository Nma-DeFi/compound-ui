import { Address } from "viem";
import { cometAbi } from "../abi/cometAbi";

export class AllowanceService {

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

    async hasPermission(owner: Address, manager: Address) {
        const hasPermission = await this.publicClient.readContract({
            ...this.contract,
            functionName: 'hasPermission',
            args: [owner, manager]
        })
        console.log(
            Date.now(),
            'AllowanceService.hasPermission',
            'chain', this.publicClient.chain.name,
            'owner', owner, 'manager', manager,
            'hasPermission', hasPermission,
            'typeOf', (typeof hasPermission),
        )
        return hasPermission
    }

    async allow(manager: Address, isAllowed: boolean) {
        console.log(
            Date.now(),
            'AllowanceService.allow',
            'manager', manager,
            'isAllowed', isAllowed,
            'account', this.account
        )
        const { request } = await this.publicClient.simulateContract({
            ...this.contract,
            functionName: 'allow',
            args: [manager, isAllowed],
            account: this.account
        })
        return await this.walletClient.writeContract(request)
    }

}