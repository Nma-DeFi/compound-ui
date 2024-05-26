import { useQuery } from "@tanstack/react-query"
import { useAppDispatch } from "../redux/hooks"
import { useCurrentAccount } from "./useCurrentAccount"
import { rewardsOwedReset } from "../redux/slices/rewardsOwed"

const REFRESH_INTERVAL = 60 * 1000

export function useAutoRefreshRewardsOwed() {

    const { isConnected } = useCurrentAccount()

    const dispatch = useAppDispatch()

    return useQuery({
        queryKey: ['AutoRefreshRewardsOwed'],
        queryFn: () => { 
            console.log(Date.now(), 'Auto-refresh owed rewards')
            dispatch(rewardsOwedReset()) 
            return Promise.resolve(true)
        },
        enabled: isConnected,
        refetchInterval:  REFRESH_INTERVAL,
    })
}