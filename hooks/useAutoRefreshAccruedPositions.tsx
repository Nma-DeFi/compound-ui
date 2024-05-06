import { useQuery } from "@tanstack/react-query"
import { useAppDispatch } from "../redux/hooks"
import { accruedPositionsReset } from "../redux/slices/positions/supplyPositions"
import { useCurrentAccount } from "./useCurrentAccount"

const REFRESH_INTERVAL = 60 * 1000

export function useAutoRefreshAccruedPositions() {

    const { isConnected } = useCurrentAccount()

    const dispatch = useAppDispatch()

    return useQuery({
        queryKey: ['AutoRefreshAccruedPositions'],
        queryFn: () => { 
            console.log(Date.now(), 'Auto-refresh accrued positions')
            dispatch(accruedPositionsReset()) 
            return Promise.resolve(true)
        },
        enabled: isConnected,
        refetchInterval:  REFRESH_INTERVAL,
    })
}