import { useMarkets } from "./useMarkets";
import { cometProxy } from "../selectors/market-selector";
import { useEffect, useState } from "react";
import { Address } from "viem";

export function useComet({ chainId }) {

    const [ comet, setComet ] = useState<Address>()    
    
    const { isSuccess: isMarkets, data: markets } = useMarkets({ chainId })

    useEffect(() => {
        if (isMarkets) {  
            const comet = cometProxy(markets[0])
            setComet(comet)
        } else {
            setComet(null)
        }
    }, [chainId, isMarkets])

    return comet
}