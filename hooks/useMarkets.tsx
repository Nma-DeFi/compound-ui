import { useQuery } from "@tanstack/react-query";
import { MarketDataService } from "../services/market-data-service";

export function useMarkets({ chainId }) {
    
    const marketInfoService = new MarketDataService({ chainId })

    return useQuery({
        queryKey: ['AllMarkets', chainId],
        queryFn: () => marketInfoService.findAllMarkets(),
    })
}