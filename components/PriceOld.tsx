import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { Asset } from "../types";
import { usePriceOld } from "../hooks/usePriceOld";
import { bnf } from "../utils/bn";
import { NoData } from "./Layout";

type PriceParam = {
    asset: Asset
    amount: BigNumber
}

export const PRICE_DP = 2

export default function PriceOld({ asset, amount } : PriceParam) {

    const [price, setPrice] = useState<string>()

    const { isSuccess: isPrice, data: usdPrice } = usePriceOld({ token: asset })

    useEffect(() => {
        if (amount === undefined || amount === null || !isPrice) {
            setPrice(NoData)
        } else {
            const price = bnf(amount.times(usdPrice), PRICE_DP, false) 
            setPrice(`$${price}`)
        }
    }, [asset, amount, isPrice])

    return price
}