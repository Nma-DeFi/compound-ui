import { useEffect, useState } from "react";
import { NoData } from "./Layout";
import { useCurrentChain } from "../hooks/useCurrentChain";
import { Address, usePublicClient } from "wagmi";
import { AsyncNumber, IdleData, loadAsyncData } from "../utils/async";
import { usePriceService } from "../hooks/usePriceService";
import Price from "./Price";
import PlaceHolder, { PlaceHolderParam } from "./PlaceHolder";
import BigNumber from "bignumber.js";
import { Zero } from "../utils/bn";
import { PriceFeed } from "../types";

type PriceAsyncParam = {
  comet: Address,
  priceFeed: PriceFeed,
  amount: BigNumber
  placeHolderCfg?: PlaceHolderParam
}

export default function PriceAsync({ comet, priceFeed, amount, placeHolderCfg } : PriceAsyncParam) {
    
    const [ asyncPrice, setAsyncPrice ] = useState<AsyncNumber>(IdleData)
    const { isIdle, isLoading, isSuccess, data: price } = asyncPrice

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })

    const priceService = usePriceService({ publicClient, comet })

    useEffect(() => {
        if (priceService && priceFeed) {
            const promise = priceService.getPriceFromFeed(priceFeed)
            loadAsyncData(promise, setAsyncPrice)
        } else {
            setAsyncPrice(IdleData)
        }
    }, [priceService, priceFeed])

    return (
        <>
            { (isIdle || isLoading) ? (
              <PlaceHolder {...placeHolderCfg}/>
            ) : isSuccess ? (
              <Price value={(amount ?? Zero).times(price)} />
            ) : (
              <>{NoData}</>
            )}
        </>    
    )
}