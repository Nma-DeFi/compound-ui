import { useQuery } from "@tanstack/react-query";
import { usePriceService } from "./usePriceService";

export function usePriceFromFeed({ chainId, publicClient, priceFeed }) {

    const priceService = usePriceService({ chainId, publicClient })

    return useQuery({
        queryKey: ['PriceFromFeed', chainId, priceFeed],
        queryFn: () => priceService.getPriceFromFeed(priceFeed),
        enabled: !!(priceService && priceFeed),
        staleTime: (2 * 60 * 1000),
    })
}