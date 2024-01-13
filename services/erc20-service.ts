import { Abi, Address, Chain, HttpTransport, createPublicClient, http } from 'viem'
import { PublicClient, erc20ABI } from 'wagmi';
import { chainFromId } from '../utils/chains';

export class Erc20Service {

    client: PublicClient<HttpTransport, Chain>
    contract: { address: Address; abi: Abi }

    constructor({ chainId, erc20Contract }) {
        this.client = createPublicClient<HttpTransport, Chain>({
            chain: chainFromId(chainId),
            transport: http(),
        })
        this.contract = {
            address: erc20Contract,
            abi: erc20ABI
        }
    }

    async totalSupply() {
        return await this.client.readContract({
            ...this.contract,
            functionName: 'totalSupply',
        })
    }

    async balanceOf(owner) {
        return await this.client.readContract({
            ...this.contract,
            functionName: 'balanceOf',
            args: [owner]
        })
    }

    async allowance(owner, spender) {
        return await this.client.readContract({
            ...this.contract,
            functionName: 'allowance',
            args: [owner, spender]
        })
    }
}