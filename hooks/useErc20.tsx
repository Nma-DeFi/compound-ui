import { Address, createPublicClient, createWalletClient, custom, http } from "viem";
import { Erc20Service } from "../services/erc20-service";
import BigNumber from "bignumber.js";
import { chainFromId } from "../utils/chains";

type Erc20Func = {
    totalSupply: () => Promise<BigNumber>,
    balanceOf: (owner: Address) => Promise<BigNumber>,
    allowance: (owner: Address, spender: Address) => Promise<BigNumber>,
    approve: (spender: Address, amount: BigNumber)  => Promise<any>,
}

export function useErc20({ chainId, account, token }): Erc20Func {
    
    if (!chainId || !token) return { 
        totalSupply: undefined,
        balanceOf: undefined,
        allowance: undefined,
        approve: undefined
    }
    
    const publicClient = createPublicClient({
        chain: chainFromId(chainId),
        transport: http()
    })

    const walletClient = account ? createWalletClient({
        chain: chainFromId(chainId),
        transport: custom(window.ethereum),
    }) : undefined

    const erc20 = new Erc20Service({ publicClient, walletClient, account, token })

    return { 
        totalSupply: erc20.totalSupply.bind(erc20),
        balanceOf: erc20.balanceOf.bind(erc20),
        allowance: erc20.allowance.bind(erc20),
        approve: erc20.approve.bind(erc20),
    }
}