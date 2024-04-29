import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { bn, bnf } from "../utils/bn";
import { NoData } from "../utils/page";

export const AMOUNT_DP = 4
export const AMOUNT_RM = BigNumber.ROUND_UP
export const AMOUNT_TRIM_ZERO = true


type AmountParam = {
    value: BigNumber
}

export default function Amount({ value } : AmountParam) {

    const [amount, setAmount] = useState<string>()

    useEffect(() => {
        if (!value || value.isNaN()) {
            setAmount(NoData)
        } else {
            const amount = bna(value)
            setAmount(amount)
        }
    }, [value])

    return amount
}

export function bna(value: BigNumber.Value) {

    let result: string | BigNumber = bn(value ?? 0)

    let dp: number 
    let rm: BigNumber.RoundingMode

    if (result.lt(1)) {
        dp = 6
        rm = BigNumber.ROUND_UP
    } else if (result.lt(1e6)) {
        dp = 4
        rm = BigNumber.ROUND_HALF_UP
    } else {
        dp = 3
        rm = BigNumber.ROUND_HALF_UP
    }

    result = result.toFixed(dp, rm)

    if (result.includes('.')) {
        result = result.replace(/0+$/, '')
        result = result.replace(/\.$/, '')
    }

    return result
}