import { useEffect, useState } from "react";
import { useCurrentChain } from "../hooks/useCurrentChain";
import { usePublicClient } from "wagmi";
import { AsyncBigNumber, AsyncStatus, IdleData, LoadingData, SuccessData } from "../utils/async";
import { PlaceHolderParam } from "./PlaceHolder";
import BigNumber from "bignumber.js";
import { PriceFeed } from "../types";
import PriceAsync from "./PriceAsync";
import { usePriceFromFeed } from "../hooks/usePriceFromFeed";

type PriceFromFeedParam = {
  priceFeed: PriceFeed,
  amount: BigNumber,
  placeHolderCfg?: PlaceHolderParam,
}

export default function PriceFromFeed({ priceFeed, amount, placeHolderCfg } : PriceFromFeedParam) {
    const [ asyncPrice, setAsyncPrice ] = useState<AsyncBigNumber>(IdleData)

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })

    const { isLoading, isSuccess, data: price } = usePriceFromFeed({ chainId, publicClient, priceFeed })

    useEffect(() => {
      if (isLoading) {
        setAsyncPrice(LoadingData)
      } else if (isSuccess)  {
        setAsyncPrice(SuccessData(amount.times(price)))
      } else {
        setAsyncPrice(IdleData)
      }
  }, [isLoading, isSuccess, amount])

    return <PriceAsync {...{ asyncPrice, placeHolderCfg }} />
}