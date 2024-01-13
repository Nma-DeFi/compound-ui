import { Erc20Service } from "../services/erc20-service";

type Erc20Func = {
    balanceOf: (owner: any) => Promise<unknown>,
    totalSupply: () => Promise<unknown>,
    allowance: (owner: any, spender: any) => Promise<unknown>
}

export function useErc20({ chainId, erc20Contract }): Erc20Func {
    
    if (!chainId || !erc20Contract) return { 
        balanceOf: undefined,
        totalSupply: undefined,
        allowance: undefined
    }

    const erc20 = new Erc20Service({ chainId, erc20Contract })

    return { 
        balanceOf: erc20.balanceOf.bind(erc20),
        totalSupply: erc20.totalSupply.bind(erc20),
        allowance: erc20.allowance.bind(erc20)
    }
}