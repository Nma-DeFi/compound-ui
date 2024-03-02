import { useQuery } from "@tanstack/react-query";
import { usePriceService } from "./usePriceService";
import { useCurrentChain } from "./useCurrentChain";

export function usePriceFromFeed({ publicClient, comet, priceFeed }) {
    
    const { currentChainId } = useCurrentChain()
    const priceService = usePriceService({ publicClient, comet })

    return useQuery({
        queryKey: ['PriceFromFeed', currentChainId, priceFeed?.address],
        queryFn: () => priceService.getPriceFromFeed(priceFeed),
        enabled: !!(priceService && priceFeed),
    })
}