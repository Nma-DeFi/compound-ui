import { useCurrentChain } from "../hooks/useCurrentChain";
import { usePublicClient } from "wagmi";
import { PlaceHolderParam } from "./PlaceHolder";
import BigNumber from "bignumber.js";
import { PriceFeed } from "../types";
import PriceAsync from "./PriceAsync";
import { useBaseTokenPriceFromFeed } from "../hooks/useBaseTokenPriceFromFeed";

type PriceFromFeedParam = {
  priceFeed: PriceFeed,
  amount: BigNumber,
  placeHolderCfg?: PlaceHolderParam,
}

export default function BaseTokenPriceFromFeed({ priceFeed, amount, placeHolderCfg } : PriceFromFeedParam) {

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })

    const asyncPrice = useBaseTokenPriceFromFeed({ chainId, publicClient, priceFeed, amount })

    return <PriceAsync {...{ asyncPrice, placeHolderCfg }} />
}