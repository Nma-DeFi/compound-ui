import { useQuery } from "@tanstack/react-query";
import { useSubgraph } from "./useSubgraph";

export function useMarkets(chainId: number) {

    const subgraph = useSubgraph(chainId);

    return useQuery({
        queryKey: ['AllMarkets', chainId],
        queryFn: () => subgraph.AllMarkets(),
    });
}