import { useQuery } from "@tanstack/react-query"
import { useSupplyService } from "./useSupplyService"
import { useCurrentChain } from "./useCurrentChain"

export function useSupplyBalance({ comet, publicClient, walletClient, account }) {

    const { currentChainId: chainId } = useCurrentChain()
    
    const supplyService = useSupplyService({ comet, publicClient, walletClient, account })

    return useQuery({
        queryKey: ['supplyBalanceOf', chainId, account, comet],
        queryFn: () => supplyService.supplyBalanceOf(account),
        enabled: !!supplyService,
    })
}