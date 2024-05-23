import { useCurrentAccount } from "./useCurrentAccount"
import { useCurrentChain } from "./useCurrentChain"
import { useQuery } from "@tanstack/react-query"
import { PRICE_STALE_TIME } from "../services/price-service"
import { RewardsOwedState } from "../redux/slices/rewardsOwed"
import { getTotalRewardsUsdByChain } from "../redux/helpers/rewards"

export function useTotalRewardsUsdByChain(rewardsOwedState : RewardsOwedState) {
    const { isSuccess: isRewards, data: rewardsOwed } = rewardsOwedState
    
    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    return useQuery({
        queryKey: ['TotalRewardsUsdByChain', chainId, rewardsOwed],
        queryFn: () => getTotalRewardsUsdByChain({ chainId, rewardsOwed }),
        enabled: Boolean(isConnected && isRewards),
        staleTime: PRICE_STALE_TIME,
    })
}