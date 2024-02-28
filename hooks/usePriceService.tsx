import { useEffect, useState } from "react"
import { PriceService } from "../services/price-service"

export function usePriceService({ comet, publicClient }) : PriceService {
    
    const [ priceService, setPriceService ] = useState<PriceService>()

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