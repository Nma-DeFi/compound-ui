export function nf(value, dp = 2) {
    return Number(value).toFixed(dp);
}

export function percent(value: number | string, dp = 0) {
    const percent = Number(value) * 100
    return percent.toFixed(dp) + '%'
}