import BigNumber from "bignumber.js";
import { formatUnits, parseUnits } from "viem";

const DEFAULT_PRECISION = 2;

export const Zero = bn(0);

export function bn(value) {
    return new BigNumber(value);
}

export function bnf(value, dp = DEFAULT_PRECISION) {
    const val = bn(value ?? 0)

    if (val.abs().gte(1e9)) {
        return `${val.div(1e9).toFixed(dp)}B`;
    } else if (val.abs().gte(1e6)) {
        return `${val.div(1e6).toFixed(dp)}M`;
    } else if (val.abs().gte(1e3)) {
        return `${val.div(1e3).toFixed(dp)}K`;
    } else {
        return val.toFixed(dp);
    }
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
