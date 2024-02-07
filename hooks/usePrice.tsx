import { useQuery } from "@tanstack/react-query";
import { PriceService } from "../services/price-service";
import { useEffect, useState } from "react";

export function usePrice({ token }) {

    const [ priceService, setPriceService ] = useState<PriceService>()

    useEffect(() => {
        if (token) {
            const priceService = new PriceService()
            setPriceService(priceService)
        } else {
            setPriceService(null)
        }
    }, [token])
    
    return useQuery({
        queryKey: ['getPrice', token?.symbol],
        queryFn: () => priceService.getPrice(token.symbol),
        enabled: !!(priceService && token),
        staleTime: (5 * 60 * 1000),
    })
}