import { bn } from "./utils/bn";

export const PRICE_SCALE = 1e8;

export const BASE_INDEX_SCALE = 1e15;

export function presentBaseValue(basePrincipal, baseIndex) {
    return bn(basePrincipal).times(baseIndex).div(BASE_INDEX_SCALE);
}

export function priceScale(price) {
    return bn(price).div(PRICE_SCALE);
}

export function tokenScale(tokenValue, decimals) {
    const factor = bn(10).pow(decimals);
    return bn(tokenValue).div(factor);
}