import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { bnf } from "../utils/bn";
import { NoData } from "./Layout";

export const AmountDecimalPrecision = 4

type AmountConfig = {
    dp?: number
    trimZeros?: boolean
}

type AmountParam = {
    value: BigNumber
    config?: AmountConfig
}

const DefaultConfig: AmountConfig = {
    dp: AmountDecimalPrecision,
    trimZeros: true,
}

export default function Amount({ value, config = DefaultConfig } : AmountParam) {

    const [amount, setAmount] = useState<string>()

    useEffect(() => {
        if (value === undefined || value === null) {
            setAmount(NoData)
        } else {
            const { dp, trimZeros } = config
            const amount = bnf(value, dp, trimZeros)
            setAmount(amount)
        }
    }, [value])

    return amount
}