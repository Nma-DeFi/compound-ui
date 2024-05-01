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
    } else {
        dp = result.lt(1e6) ? 4 : 3
        rm = BigNumber.ROUND_HALF_UP
    } 

    result = result.toFixed(dp, rm)

    if (result.includes('.')) {
        result = result.replace(/0+$/, '')
        result = result.replace(/\.$/, '')
    }

    return result
}

export function bna2(value: BigNumber.Value) {

    let result: string | BigNumber = bn(value ?? 0)

    if (result.lt(1)) {
        result = result.toFixed(6, BigNumber.ROUND_UP)
        if (result.includes('.')) {
            result = result.replace(/0+$/, '')
            result = result.replace(/\.$/, '')
        }
    } else {
        if (result.gte(1e9)) {
            result = `${result.div(1e9).toFixed(2)}B`
        } else if (result.gte(1e6)) {
            result = `${result.div(1e6).toFixed(2)}M`
        } else if (result.gte(1e4)) {
            result = `${result.div(1e3).toFixed(2)}K`
        } else {
            result = result.toFixed(3)
        }
    } 

    return result
}