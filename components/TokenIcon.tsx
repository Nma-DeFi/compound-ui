import { useEffect, useState } from "react";
import { getTokenIcon } from "../resources/token-icons";

type TokenIconParam = {
    symbol: string
    css?: string
    width?: string | number
}

export default function TokenIcon({ symbol, css, width } : TokenIconParam) {

    const [icon, setIcon] = useState<string>()

    useEffect(() => {
        const icon = getTokenIcon(symbol)
        setIcon(icon)
    }, [symbol])

    return <img src={icon} alt={symbol} className={css} width={width} /> 
}