import { One } from "../utils/bn"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { AsyncBigNumber, IdleData, LoadingData, SuccessData } from "../utils/async"
import { PRICE_STALE_TIME, PriceService } from "../services/price-service"

export function usePriceFromSymbol({ symbol, amount }) {


    const [ asyncPrice, setAsyncPrice ] = useState<AsyncBigNumber>(IdleData)
    
    const { isLoading, isSuccess, isError, data: price, error } =  useQuery({
        queryKey: ['PriceFromSymbol', symbol],
        queryFn: () => (new PriceService()).getPriceFromSymbol(symbol),
        enabled: !!symbol,
        staleTime: PRICE_STALE_TIME,
    })

    useEffect(() => {
        if (!amount) { 
            setAsyncPrice(IdleData)
        } else if (isLoading) {
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