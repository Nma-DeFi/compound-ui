import { PlaceHolderParam } from "./PlaceHolder";
import BigNumber from "bignumber.js";
import PriceAsync from "./PriceAsync";
import { usePriceFromSymbol } from "../hooks/usePriceFromSymbol";

type PriceFromSymbolParam = {
  symbol: string,
  amount: BigNumber,
  placeHolderCfg?: PlaceHolderParam,
}

export default function PriceFromSymbol({ symbol, amount, placeHolderCfg } : PriceFromSymbolParam) {

    const asyncPrice = usePriceFromSymbol({ symbol, amount })

    return <PriceAsync {...{ asyncPrice, placeHolderCfg }} />
}