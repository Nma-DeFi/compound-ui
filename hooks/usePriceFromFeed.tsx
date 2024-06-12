import { One } from "../utils/bn";
import { useEffect, useState } from "react";
import { AsyncBigNumber, IdleData, LoadingData, SuccessData } from "../utils/async";
import { useQuery } from "@tanstack/react-query";
import { PRICE_STALE_TIME, PriceService } from "../services/price-service";
import { cometProxy } from "../selectors/market-selector";
import { useMarkets } from "./useMarkets";

async function priceFromFeed(publicClient, priceFeed, markets) {
    const comet = cometProxy(markets[0])
    const priceService = new PriceService({ publicClient, comet })
    return priceService.getPriceFromFeed(priceFeed)
}

export function usePriceFromFeed({ chainId, publicClient, priceFeed, amount = One }) {

    const [ asyncPrice, setAsyncPrice ] = useState<AsyncBigNumber>(IdleData)
    
    const { isSuccess: isMarkets, data: markets } = useMarkets({ chainId })

    const { isLoading, isSuccess, isError, data: price, error } =  useQuery({
        queryKey: ['PriceFromFeed', chainId, priceFeed],
        queryFn: () => priceFromFeed(publicClient, priceFeed, markets),
        enabled: !!(publicClient && priceFeed?.address && isMarkets),
        staleTime: PRICE_STALE_TIME,
    })

    useEffect(() => {
        if (isLoading) {
            setAsyncPrice(LoadingData)
        } else if (isSuccess)  {
            const successPrice = SuccessData(amount.times(price))
            setAsyncPrice(successPrice)
        } else {
            if (isError) console.error(error)
            setAsyncPrice(IdleData)
        }
    }, [isLoading, isSuccess, isError, price, amount, error])

    return asyncPrice
}