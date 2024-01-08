import { useQuery } from "@tanstack/react-query";
import { MarketInfoService } from "../services/market-info-service";

export function useMarkets({ chainId, account }) {
    
    const marketInfoService = new MarketInfoService({ chainId });

    return account ? useQuery({
        queryKey: ['AllMarketsWithSupplyPositions', chainId, account],
        queryFn: () => marketInfoService.findAllMarketsWithSupplyPositions(account),
    }) : useQuery({
        queryKey: ['AllMarkets', chainId],
        queryFn: () => marketInfoService.findAllMarkets(),
    });
}