import { useQuery } from "@tanstack/react-query"
import { useCurrentChain } from "../components/NetworkSelector"
import { usePositionsService } from "./usePositionsService"

export function useSupplyBalance({ comet, publicClient, account }) {

    const { currentChainId: chainId } = useCurrentChain()
    
    const positionsService = usePositionsService({ comet, publicClient })

    return useQuery({
        queryKey: ['supplyBalanceOf', chainId, account, comet],
        queryFn: () => positionsService.supplyBalanceOf(account),
        enabled: !!(positionsService && account),
    })
}