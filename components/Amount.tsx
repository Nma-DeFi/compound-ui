import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { bnf } from "../utils/bn";
import { NoData } from "./Layout";

export const AMOUNT_DP = 4
export const AMOUNT_RM = BigNumber.ROUND_UP

type AmountConfig = {
    dp?: number
    trimZeros?: boolean
}

type AmountParam = {
    value: BigNumber
    config?: AmountConfig
}

const DefaultConfig: AmountConfig = {
    dp: AMOUNT_DP,
    trimZeros: true,
}

export default function Amount({ value, config = DefaultConfig } : AmountParam) {

    const [amount, setAmount] = useState<string>()

    useEffect(() => {
        if (!value || value.isNaN()) {
            setAmount(NoData)
        } else {
            const { dp, trimZeros } = config
            const amount = bnf(value, dp, trimZeros, AMOUNT_RM)
            setAmount(amount)
        }
    }, [value])

    return amount
}