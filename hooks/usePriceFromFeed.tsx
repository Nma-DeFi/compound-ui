import { One } from "../utils/bn";
import { useEffect, useState } from "react";
import { AsyncBigNumber, IdleData, LoadingData, SuccessData } from "../utils/async";
import { usePriceService } from "./usePriceService";
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

    //const priceService = usePriceService({ chainId, publicClient })

    const { isLoading, isSuccess, data: price } =  useQuery({
        queryKey: ['PriceFromFeed', chainId, priceFeed],
        //queryFn: () => priceService.getPriceFromFeed(priceFeed),
        //enabled: !!(priceService && priceFeed),
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
            setAsyncPrice(IdleData)
        }
    }, [isLoading, isSuccess, amount])

    return asyncPrice
}