import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { bn } from "../utils/bn";
import { NoData } from "../utils/page";

type PriceParam = { value: BigNumber }

export default function Price({ value } : PriceParam) {

    const [price, setPrice] = useState<string>()

    useEffect(() => {
        if (!value || value.isNaN()) {
            setPrice(NoData)
        } else {
            setPrice(`$${bnp(value) }`)
        }
    }, [value])

    return price
}

export function bnp(value: BigNumber.Value) {

    let result: string | BigNumber = bn(value ?? 0)

    if (result.gte(1e9)) {
        result = `${result.div(1e9).toFixed(2)}b`
    } else if (result.gte(1e6)) {
        result = `${result.div(1e6).toFixed(2)}m`
    } else if (result.gte(1e4)) {
        result = `${result.div(1e3).toFixed(2)}k`
    } else {
        result = result.toFixed(2)
    }

    return result
}