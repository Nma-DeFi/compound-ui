import { arbitrum } from "viem/chains"
import { baseTokePriceFeed, baseToken } from "../selectors/market-selector"
import { PriceFeed, PriceFeedKind } from "../types"
import { getTokenOrNativeCurrency, isWrappedNativeToken, nativeCurrency } from "./chains"
import { Address, isAddressEqual } from 'viem';

const BASE_TOKEN_NAMES = {
    [arbitrum.id] : {
        '0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA': {
            symbol: 'USDC.e',
            name: 'USDC Bridged',
            decimals: 6,
            address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        },
        '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf': {
            symbol: 'USDC',
            name: 'USDC Native',
            decimals: 6,
            address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        }
    }
}

function customBaseTokenData({ chainId, marketId }) {
    if (!(chainId in BASE_TOKEN_NAMES)) return undefined
    const entry = Object.entries(BASE_TOKEN_NAMES[chainId])
        .find(([m, _]) => isAddressEqual(marketId as Address, m as Address))
    return entry?.[1]
}
  
export function isNativeCurrencyMarket(market, chainId) {
    if (!chainId || !market || !baseToken(market)) return undefined
    return isWrappedNativeToken(chainId, baseToken(market))
}

export function getBaseTokenOrNativeCurrency(market, chainId) {
    if (!chainId || !market || !baseToken(market)) return undefined
    const customBaseToken = customBaseTokenData({ chainId, marketId: market.id })
    return customBaseToken ?? getTokenOrNativeCurrency(chainId, baseToken(market))
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


