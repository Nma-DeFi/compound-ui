import { useEffect, useState } from "react";
import { useCurrentChain } from "../hooks/useCurrentChain";
import { Address, usePublicClient } from "wagmi";
import { AsyncBigNumber, AsyncStatus, IdleData, LoadingData } from "../utils/async";
import { PlaceHolderParam } from "./PlaceHolder";
import BigNumber from "bignumber.js";
import { PriceFeed } from "../types";
import PriceAsync from "./PriceAsync";
import { usePriceFromFeed } from "../hooks/usePriceFromFeed";

type PriceFromFeedParam = {
  comet: Address,
  priceFeed: PriceFeed,
  amount: BigNumber,
  placeHolderCfg?: PlaceHolderParam,
}

export default function PriceFromFeed({ comet, priceFeed, amount, placeHolderCfg } : PriceFromFeedParam) {
    
    const [ asyncPrice, setAsyncPrice ] = useState<AsyncBigNumber>(IdleData)

    const { currentChainId: chainId } = useCurrentChain()
    
    const publicClient = usePublicClient({ chainId })

    const { isLoading, isSuccess, data: price } = usePriceFromFeed({ publicClient, comet, priceFeed })

    useEffect(() => {
      if (isLoading) {
        setAsyncPrice(LoadingData)
      } else if (isSuccess)  {
        setAsyncPrice({data: amount.times(price), ...AsyncStatus.Success })
      } else {
        setAsyncPrice(IdleData)
      }
  }, [isLoading, isSuccess, amount])

    return <PriceAsync {...{ asyncPrice, placeHolderCfg }} />
}