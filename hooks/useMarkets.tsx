import { useQuery } from "@tanstack/react-query";
import { MarketInfoService } from "../services/market-info-service";

export function useMarkets(chainId: number) {

    const marketInfoService = new MarketInfoService({ chainId });
    console.log('useMarkets', marketInfoService.findAllMarkets().then(m => console.log(m)));

    return useQuery({
        queryKey: ['AllMarkets', chainId],
        queryFn: () => marketInfoService.findAllMarkets(),
    });
}