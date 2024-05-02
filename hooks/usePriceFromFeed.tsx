import { One } from "../utils/bn";
import { useEffect, useState } from "react";
import { AsyncBigNumber, IdleData, LoadingData, SuccessData } from "../utils/async";
import { useQuery } from "@tanstack/react-query";
import { PRICE_STALE_TIME, PriceService } from "../services/price-service";
import { MarketDataService } from "../services/market-data-service";
import { cometProxy } from "../selectors/market-selector";

async function priceFromFeed(chainId, publicClient, priceFeed) {
    const marketDataService = new MarketDataService({ chainId })
    const markets = await marketDataService.findAllMarkets()
    const comet = cometProxy(markets[0])
    const priceService = new PriceService({ publicClient, comet })
    return priceService.getPriceFromFeed(priceFeed)
}

export function usePriceFromFeed({ chainId, publicClient, priceFeed, amount = One }) {

    const [ asyncPrice, setAsyncPrice ] = useState<AsyncBigNumber>(IdleData)
    const { isLoading, isSuccess, isError, data: price, error } =  useQuery({
        queryKey: ['PriceFromFeed', chainId, priceFeed],
        queryFn: () => priceFromFeed(chainId, publicClient, priceFeed),
        enabled: !!(publicClient && priceFeed?.address),
        staleTime: PRICE_STALE_TIME,
    })

    useEffect(() => {
        if (isLoading) {
            setAsyncPrice(LoadingData)
        } else if (isSuccess)  {
            setAsyncPrice(SuccessData(amount.times(price)))
        } else {
            if (isError) console.error(error)
            setAsyncPrice(IdleData)
        }
    }, [isLoading, isSuccess, isError, amount, error])

    return asyncPrice
}