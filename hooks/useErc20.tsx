import { Address } from "viem";
import { Erc20Service } from "../services/erc20-service";

type Erc20Func = {
    totalSupply: () => Promise<bigint>,
    balanceOf: (owner: Address) => Promise<bigint>,
    allowance: (owner: Address, spender: Address) => Promise<bigint>
}

export function useErc20({ chainId, erc20Contract }): Erc20Func {
    
    if (!chainId || !erc20Contract) return { 
        totalSupply: undefined,
        balanceOf: undefined,
        allowance: undefined
    }

    const erc20 = new Erc20Service({ chainId, erc20Contract })

    return { 
        totalSupply: erc20.totalSupply.bind(erc20),
        balanceOf: erc20.balanceOf.bind(erc20),
        allowance: erc20.allowance.bind(erc20)
    }
}