import { useEffect, useState } from "react";
import { getTokenIcon } from "../resources/token-icons";

type TokenIconParam = {
    symbol: string
    css?: string
    size?: string | number
}

export default function TokenIcon({ symbol, css, size } : TokenIconParam) {

    const [icon, setIcon] = useState<string>()

    useEffect(() => {
        const icon = getTokenIcon(symbol)
        setIcon(icon)
    }, [symbol])

    return icon && ( 
        <img src={icon} alt={symbol} title={symbol} className={css} width={size} height={size} /> 
    )
}