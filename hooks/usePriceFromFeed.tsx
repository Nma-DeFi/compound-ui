import { One } from "../utils/bn";
import { useEffect, useState } from "react";
import { AsyncBigNumber, IdleData, LoadingData, SuccessData } from "../utils/async";
import { usePriceService } from "./usePriceService";
import { useQuery } from "@tanstack/react-query";

export function usePriceFromFeed({ chainId, publicClient, priceFeed, amount = One }) {

    const [ asyncPrice, setAsyncPrice ] = useState<AsyncBigNumber>(IdleData)

    const priceService = usePriceService({ chainId, publicClient })

    const { isLoading, isSuccess, data: price } =  useQuery({
        queryKey: ['PriceFromFeed', chainId, priceFeed],
        queryFn: () => priceService.getPriceFromFeed(priceFeed),
        enabled: !!(priceService && priceFeed),
        staleTime: (2 * 60 * 1000),
    })

    useEffect(() => {
        if (isLoading) {
        setAsyncPrice(LoadingData)
        } else if (isSuccess)  {
        setAsyncPrice(SuccessData(amount.times(price)))
        } else {
        setAsyncPrice(IdleData)
        }
    }, [isLoading, isSuccess, amount])

    return asyncPrice
}