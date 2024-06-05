import { useQuery } from "@tanstack/react-query"
import { useAppDispatch } from "../redux/hooks"
import { accruedPositionsRefresh } from '../redux/helpers/common'
import { useCurrentAccount } from "./useCurrentAccount"

const REFRESH_INTERVAL = 600 * 1000

export function useAutoRefreshAccruedPositions() {

    const { isConnected } = useCurrentAccount()

    const dispatch = useAppDispatch()

    return useQuery({
        queryKey: ['AutoRefreshAccruedPositions'],
        queryFn: () => { 
            console.log(Date.now(), 'Auto-refresh accrued positions')
            dispatch(accruedPositionsRefresh()) 
            return Promise.resolve(true)
        },
        enabled: isConnected,
        refetchInterval:  REFRESH_INTERVAL,
    })
}