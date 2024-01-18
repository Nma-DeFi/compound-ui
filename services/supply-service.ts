import Compound from "@compound-finance/compound-js";
import { Abi, Address, PublicClient, WalletClient, parseAbi } from "viem";
import { toBigInt } from "../utils/bn";

const cometAbi = parseAbi([
    'event Supply(address indexed from, address indexed dst, uint256 amount)',
    'function supply(address asset, uint amount)',
    'function withdraw(address asset, uint amount)',
    'function balanceOf(address account) returns (uint256)',
    'function borrowBalanceOf(address account) returns (uint256)',
    'function collateralBalanceOf(address account, address asset) external view returns (uint128)',
])

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
}