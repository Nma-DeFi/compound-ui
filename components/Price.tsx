import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { bnf } from "../utils/bn";
import { NoData } from "./Layout";

const PRICE_DP = 2

type PriceParam = { value: BigNumber }

export default function Price({ value } : PriceParam) {

    const [price, setPrice] = useState<string>()

    useEffect(() => {
        if (!value || value.isNaN()) {
            setPrice(NoData)
        } else {
            setPrice(`$${bnf(value, PRICE_DP, false) }`)
        }
    }, [value])

    return price
}