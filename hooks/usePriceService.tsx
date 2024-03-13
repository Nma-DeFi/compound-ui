import { useEffect, useState } from "react"
import { PriceService } from "../services/price-service"
import { useComet } from "./useComet"

export function usePriceService({ chainId, publicClient }) : PriceService {
    
    const [ priceService, setPriceService ] = useState<PriceService>()

    const comet =  useComet({ chainId })

    useEffect(() => {
        if (publicClient &&  comet) {
            const service = new PriceService({ publicClient, comet })
            setPriceService(service)
        } else {
            setPriceService(null)
        }
    }, [publicClient, comet])

    return priceService
}