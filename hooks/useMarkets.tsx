import { useQuery } from "@tanstack/react-query";
import { MarketInfoService } from "../services/market-info-service";

export function useMarkets(chainId: number) {

    const marketInfoService = new MarketInfoService({ chainId });

    return useQuery({
        queryKey: ['AllMarkets', chainId],
        queryFn: () => marketInfoService.findAllMarkets(),
    });
}