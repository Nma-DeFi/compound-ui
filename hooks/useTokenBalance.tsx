import { useErc20 } from "./useErc20";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { fromBigInt } from "../utils/bn";

export function useTokenBalance({ chainId, token, owner }) {

    const [ balance, setBalance ] = useState<BigNumber>(null)

    const { balanceOf }  = useErc20({ chainId, erc20Contract: token?.address })

    useEffect(() => {
        setBalance(null)
        if (owner) {
            balanceOf?.(owner).then(value => {
                const balance = fromBigInt(value, token.decimals)
                setBalance(balance)
            })
        }
    }, [chainId, token, owner])
    
    // TODO useQuery
    return balance
}