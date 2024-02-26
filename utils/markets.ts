import { baseToken } from "../selectors/market-selector"
import { getTokenOrNativeCurrency, isWrappedNativeToken } from "./chains"

  
export function isNativeCurrencyMarket(market, chainId) {
    if (!chainId || !market || !baseToken(market)) return undefined
    return isWrappedNativeToken(chainId, baseToken(market))
}

export function getBaseTokenOrNativeCurrency(market, chainId) {
    if (!chainId || !market || !baseToken(market)) return undefined
    return getTokenOrNativeCurrency(chainId, baseToken(market))
}