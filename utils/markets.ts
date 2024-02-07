import { isAddressEqual } from "viem"
import { baseToken } from "../selectors/market-selector"
import { nativeCurrency, wrappedNativeToken } from "./chains"

  
export function isNativeCurrencyMarket(market, chainId) {
    if (!chainId || !market || !baseToken(market)) return undefined
    const baseTokenAddress = baseToken(market).address
    const nativeTokenAddress = wrappedNativeToken(chainId)
    return isAddressEqual(baseTokenAddress, nativeTokenAddress)
}

export function unWrappedNativeToken(market, chainId) {
    if (!chainId || !market || !baseToken(market)) return undefined
    if (isNativeCurrencyMarket(market, chainId)) {
        return nativeCurrency(chainId)
    } else {
        return baseToken(market)
    }
}