import BigNumber from "bignumber.js"
import { formatUnits, parseUnits } from "viem"

export const Zero = bn(0), One = bn(1)

export const DEFAULT_DP = 2
export const DEFAULT_TRIM = true
export const DEFAULT_RM = BigNumber.ROUND_HALF_UP

type DecimalsTypes = string | bigint | number

export function bn(value: BigNumber.Value) {
    return new BigNumber(value)
}

export function bnf(
        value: BigNumber.Value, 
        dp: number = DEFAULT_DP, 
        trimZeros: boolean = DEFAULT_TRIM, 
        rm: BigNumber.RoundingMode = DEFAULT_RM
    ) {

    let result: string | BigNumber = bn(value ?? 0)

    if (result.abs().gte(1e9)) {
        result = `${result.div(1e9).toFixed(dp, rm)}b`
    } else if (result.abs().gte(1e6)) {
        result = `${result.div(1e6).toFixed(dp, rm)}m`
    } else if (result.abs().gte(1e3)) {
        result = `${result.div(1e3).toFixed(dp, rm)}k`
    } else {
        result = result.toFixed(dp, rm)
    }

    if (trimZeros && result.includes('.')) {
        result = result.replace(/0+$/, '')
        result = result.replace(/\.$/, '')
    }

    return result
}

export function fromBigInt(bi: bigint, decimals: DecimalsTypes = 18): BigNumber {
    const _decimals = Number(decimals)
    const formatted = formatUnits(bi, _decimals)
    return bn(formatted)
}

export function toBigInt(bn: BigNumber, decimals: DecimalsTypes = 18): bigint {
    const _decimals = Number(decimals)
    return parseUnits(bn.toFixed(), _decimals)
}
