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

    async balanceOf(owner: Address) {
        console.log(
            'Erc20Service.balanceOf',
            'chain', this.client.chain.name,
            'erc20', this.contract.address,
            'owner', owner
        );
        return await this.client.readContract({
            ...this.contract,
            functionName: 'balanceOf',
            args: [owner]
        })
    }

    async allowance(owner: Address, spender: Address) {
        console.log(
            'Erc20Service.allowance',
            'chain', this.client.chain.name,
            'erc20', this.contract.address,
            'owner', owner, 'spender', spender
        );
        return await this.client.readContract({
            ...this.contract,
            functionName: 'allowance',
            args: [owner, spender]
        })
    }
}