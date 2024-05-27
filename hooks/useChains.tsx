import { useQuery } from "@tanstack/react-query";
import { ChainDataService } from "../services/chain-data-service";

export function useChains() {
    
    return useQuery({
        queryKey: ['AllChains'],
        queryFn: () => ChainDataService.findAllChains(),
    })
}