import { useErc20 } from "./useErc20";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { fromBigInt } from "../utils/bn";

export function useTokenAllowance({ chainId, token, owner, spender }) {

    const [ allowance, setAllowance ] = useState<BigNumber>(null)

    const { allowance: tokenAllowance }  = useErc20({ chainId, erc20Contract: token?.address })

    useEffect(() => {
        setAllowance(null)
        if (owner && spender) {
            tokenAllowance?.(owner, spender).then(value => {
                const allowance = fromBigInt(value, token.decimals)
                setAllowance(allowance)
            })
        }
    }, [chainId, token, owner, spender])

    return allowance
}