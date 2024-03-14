import { useCurrentChain } from "../hooks/useCurrentChain";
import { usePublicClient } from "wagmi";
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

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })

    const asyncPrice = usePriceFromFeed({ chainId, publicClient, priceFeed, amount })

    return <PriceAsync {...{ asyncPrice, placeHolderCfg }} />
}