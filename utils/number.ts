const DEFAULT_PRECISION = 2;

export function nf(value, dp = DEFAULT_PRECISION) {
    return Number(value).toFixed(dp);
}