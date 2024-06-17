import { useQuery } from "@tanstack/react-query";
import { PRICE_STALE_TIME, PriceService } from "../services/price-service";
import { baseTokePriceFeed, cometProxy } from "../selectors/market-selector";
import { AsyncBigNumber, IdleData, LoadingData, SuccessData } from "../utils/async";
import { useEffect, useState } from "react";
import { One } from "../utils/bn";
import { useMarkets } from "./useMarkets";

async function baseTokenPriceFromFeed(publicClient, priceFeed, markets) {
    const comet = cometProxy(markets[0])
    const baseTokenPriceFeeds = markets.map(baseTokePriceFeed)
    let pricePromise : Promise<number>
    if (baseTokenPriceFeeds.includes(priceFeed.address)) {
        pricePromise = (new PriceService({ publicClient, comet })).getPriceFromFeed(priceFeed)
    } else {
        pricePromise = Promise.resolve(null)
    }
    return pricePromise
}

export function useBaseTokenPriceFromFeed({ chainId, publicClient, priceFeed, amount = One }) {

    const [ asyncPrice, setAsyncPrice ] = useState<AsyncBigNumber>(IdleData)

    const { isSuccess: isMarkets, data: markets } = useMarkets({ chainId })

    const { isLoading, isSuccess, isError, data, error } = useQuery({
        queryKey: ['PriceFromFeed', chainId, priceFeed],
        queryFn: () => baseTokenPriceFromFeed(publicClient, priceFeed, markets),
        enabled: !!(publicClient && priceFeed?.address && isMarkets),
        staleTime: PRICE_STALE_TIME,
    })

    useEffect(() => {
        if (isLoading) {
            setAsyncPrice(LoadingData)
        } else if (isSuccess && data !== null)  {
            const successPrice = SuccessData(amount.times(data))
            setAsyncPrice(successPrice)
        } else {
            if (isError) console.error(error)
            setAsyncPrice(IdleData)
        }
    }, [isLoading, isSuccess, isError, data, amount, error])

    return asyncPrice

}
