import { Abi, Address } from 'viem'
import { fromBigInt, toBigInt } from '../utils/bn';
import { erc20ABI } from 'wagmi';
import BigNumber from 'bignumber.js';

export class Erc20Service {

    publicClient
    walletClient
    account: Address
    contract: { address: Address; abi: Abi }
    token: { address: Address; decimals: string | number; }

    constructor({ publicClient, walletClient, account, token }) {
        this.publicClient = publicClient
        this.walletClient = walletClient
        this.account = account
        this.token = token
        this.contract = {
            address: token.address,
            abi: erc20ABI
        }
    }

    async totalSupply() {
        const totalSupply = await this.publicClient.readContract({
            ...this.contract,
            functionName: 'totalSupply',
        })
        return this.fromBigInt(totalSupply)
    }

    async balanceOf(owner: Address) {
        console.log(
            'Erc20Service.balanceOf',
            'chain', this.publicClient.chain.name,
            'erc20', this.contract.address,
            'owner', owner
        )
        const balance = await this.publicClient.readContract({
            ...this.contract,
            functionName: 'balanceOf',
            args: [owner]
        })
        return this.fromBigInt(balance)
    }

    async allowance(owner: Address, spender: Address) {
        console.log(
            'Erc20Service.allowance',
            'chain', this.publicClient.chain.name,
            'erc20', this.contract.address,
            'owner', owner, 'spender', spender
        )
        const allowance = await this.publicClient.readContract({
            ...this.contract,
            functionName: 'allowance',
            args: [owner, spender]
        })
        return this.fromBigInt(allowance)
    }

    async approve(spender: Address, amount: BigNumber) {
        const _amount = this.toBigInt(amount)
        console.log(
            'Erc20Service.approve',
            'spender', spender,
            'amount', _amount,
        )
        const { request } = await this.publicClient.simulateContract({
            ...this.contract,
            functionName: 'approve',
            args: [spender, _amount],
            account: this.account
        })
        return await this.walletClient.writeContract(request)
    }

    private toBigInt(amount: BigNumber) {
        return toBigInt(amount, this.token.decimals);
    }

    private fromBigInt(allowance: unknown) {
        return fromBigInt(allowance as bigint, this.token.decimals);
    }
}