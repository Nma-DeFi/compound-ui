import { useQuery } from "@tanstack/react-query";
import { MarketDataService } from "../services/market-data-service";

export function useMarkets({ chainId, account }) {
    
    const marketInfoService = new MarketDataService({ chainId });

    return account ? useQuery({
        queryKey: ['AllMarketsWithSupplyPositions', chainId, account],
        queryFn: () => marketInfoService.findAllMarketsWithSupplyPositions(account),
    }) : useQuery({
        queryKey: ['AllMarkets', chainId],
        queryFn: () => marketInfoService.findAllMarkets(),
    });
}