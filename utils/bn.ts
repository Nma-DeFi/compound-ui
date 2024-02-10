import BigNumber from "bignumber.js";
import { formatUnits, parseUnits } from "viem";

export const Zero = bn(0);

export const DecimalPrecision = 2;

export function bn(value) {
    return new BigNumber(value);
}

export function bnf(value, dp = DecimalPrecision, trimZeros = true) {

    let result: string | BigNumber = bn(value ?? 0)

    if (result.abs().gte(1e9)) {
        result = `${result.div(1e9).toFixed(dp)}B`
    } else if (result.abs().gte(1e6)) {
        result = `${result.div(1e6).toFixed(dp)}M`
    } else if (result.abs().gte(1e3)) {
        result = `${result.div(1e3).toFixed(dp)}K`
    } else {
        result = result.toFixed(dp)
    }

    if (trimZeros && result.includes('.')) {
        result = result.replace(/0+$/, '')
        result = result.replace(/\.$/, '')
    }

    return result
}

export function fromBigInt(bi: bigint, decimals: string | bigint | number = 18): BigNumber {
    const _decimals = Number(decimals)
    const formatted = formatUnits(bi, _decimals)
    return bn(formatted)
}

export function toBigInt(bn: BigNumber, decimals: string | bigint | number = 18): bigint {
    const _decimals = Number(decimals)
    return parseUnits(bn.toFixed(), _decimals)
}
