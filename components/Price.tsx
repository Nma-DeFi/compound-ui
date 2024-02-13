import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { Asset } from "../types";
import { usePrice } from "../hooks/usePrice";
import { bnf } from "../utils/bn";
import { NoData } from "./Layout";

type PriceParam = {
    asset: Asset
    amount: BigNumber
}

export const PriceDecimalPrecision = 2

export default function Price({ asset, amount } : PriceParam) {

    const [price, setPrice] = useState<string>()

    const { isSuccess: isPrice, data: usdPrice } = usePrice({ token: asset })

    useEffect(() => {
        if (amount === undefined || amount === null || !isPrice) {
            setPrice(NoData)
        } else {
            const price = bnf(amount.times(usdPrice), PriceDecimalPrecision, false) 
            setPrice(`$${price}`)
        }
    }, [asset, amount, isPrice])

    return price
}