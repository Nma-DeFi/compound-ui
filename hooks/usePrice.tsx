import { useQuery } from "@tanstack/react-query";
import { usePriceService } from "./usePriceService";

export function usePrice({ publicClient, comet, priceFeed }) {

    const priceService = usePriceService({ publicClient, comet })

    return useQuery({
        queryKey: ['getPriceFromFeed', priceFeed],
        queryFn: () => priceService.getPriceFromFeed(priceFeed),
        enabled: !!(priceService && priceFeed),
        staleTime: (2 * 60 * 1000),
    })
}