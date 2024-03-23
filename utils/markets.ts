import { baseTokePriceFeed, baseToken } from "../selectors/market-selector"
import { PriceFeed, PriceFeedKind } from "../types"
import { getTokenOrNativeCurrency, isWrappedNativeToken, nativeCurrency } from "./chains"

  
export function isNativeCurrencyMarket(market, chainId) {
    if (!chainId || !market || !baseToken(market)) return undefined
    return isWrappedNativeToken(chainId, baseToken(market))
}

export function getBaseTokenOrNativeCurrency(market, chainId) {
    if (!chainId || !market || !baseToken(market)) return undefined
    return getTokenOrNativeCurrency(chainId, baseToken(market))
}

export function getPriceFeedKind(market, chainId) {
    if (!chainId || !market || !baseToken(market)) return undefined
    if (isNativeCurrencyMarket(market, chainId) && nativeCurrency(chainId).symbol === 'ETH') {
        return PriceFeedKind.ETH_PRICE
    } else {
        return PriceFeedKind.USD_PRICE
    }
}

export function getPriceFeed(market, chainId) : PriceFeed {
    if (!chainId || !market || !baseToken(market)) return undefined
    const priceFeedAddress = baseTokePriceFeed(market)
    const priceFeedKind = getPriceFeedKind(market, chainId)
    return { address: priceFeedAddress, kind: priceFeedKind }
}


