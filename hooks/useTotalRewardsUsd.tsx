import { useCurrentAccount } from "./useCurrentAccount"
import { useQuery } from "@tanstack/react-query"
import { PRICE_STALE_TIME } from "../services/price-service"
import { RewardsOwedState } from "../redux/slices/rewardsOwed"
import { getTotalRewardsUsd } from "../redux/helpers/rewards"

export function useTotalRewardsUsd(rewardsOwedState : RewardsOwedState) {
    const { isSuccess: isRewards, data: rewardsOwed } = rewardsOwedState
    
    const { isConnected } = useCurrentAccount()

    return useQuery({
        queryKey: ['TotalRewardsUsd', rewardsOwed],
        queryFn: () => getTotalRewardsUsd({ rewardsOwed }),
        enabled: Boolean(isConnected && isRewards),
        staleTime: PRICE_STALE_TIME,
    })
}