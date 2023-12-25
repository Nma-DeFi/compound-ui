import BigNumber from "bignumber.js";

const DEFAULT_PRECISION = 2;

export function bn(value) {
    return new BigNumber(value);
}

export function bnf(value, dp = DEFAULT_PRECISION) {

    const val = bn(value);

    if (val.abs().gte('1e+9')) {
        return `${val.div('1e+9').toFixed(dp)}B`;
    } else if (val.abs().gte('1e+6')) {
        return `${val.div('1e+6').toFixed(dp)}M`;
    } else if (val.abs().gte('1e+3')) {
        return `${val.div('1e+3').toFixed(dp)}K`;
    } else {
        return val.toFixed(dp);
    }
}
