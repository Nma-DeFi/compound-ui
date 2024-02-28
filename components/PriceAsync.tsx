import { useEffect, useState } from "react";
import { NoData } from "./Layout";
import { useCurrentChain } from "../hooks/useCurrentChain";
import { usePublicClient } from "wagmi";
import { AsyncBigNumber, IdleData, loadAsyncData } from "../utils/async";
import { usePriceService } from "../hooks/usePriceService";
import Price from "./Price";
import PlaceHolder from "./PlaceHolder";

export default function PriceAsync({ comet, priceFeed, amount }) {
    
    const [ asyncPrice, setAsyncPrice ] = useState<AsyncBigNumber>(IdleData)
    const { isIdle, isLoading, isSuccess, data: price } = asyncPrice

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })

    const priceService = usePriceService({ publicClient, comet })

    useEffect(() => {
        if (priceService && priceFeed && amount) {
            const promise = priceService.getPriceFromFeed(priceFeed).then(p => amount.times(p))
            loadAsyncData(promise, setAsyncPrice)
        } else {
            setAsyncPrice(IdleData)
        }
    }, [priceService, priceFeed, amount])

    return (
        <>
            { (isIdle || isLoading) ? (
              <PlaceHolder />
            ) : isSuccess ? (
              <Price value={price} />
            ) : (
              <>{NoData}</>
            )}
        </>    
    )
}