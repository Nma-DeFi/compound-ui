import { useQuery } from "@tanstack/react-query";
import { PriceService } from "../services/price-service";
import { useEffect, useState } from "react";

export function usePriceOld({ token }) {

    const [ priceService, setPriceService ] = useState<PriceService>()

    useEffect(() => {
        const priceService = new PriceService({})
        setPriceService(priceService)
    }, [])
    
    return useQuery({
        queryKey: ['getPrice', token?.symbol],
        queryFn: () => priceService.getPriceFromSymbol(token.symbol),
        enabled: !!(priceService && token),
        staleTime: (2 * 60 * 1000),
    })
}