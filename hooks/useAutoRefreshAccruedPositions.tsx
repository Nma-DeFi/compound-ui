import { useQuery } from "@tanstack/react-query"
import { useAppDispatch } from "../redux/hooks"
import { accruedPositionsReset } from "../redux/slices/positions/supplyPositions"

const REFRESH_INTERVAL = 60 * 1000

export function useAutoRefreshAccruedPositions() {

    const dispatch = useAppDispatch()

    return useQuery({
        queryKey: ['AutoRefreshAccruedPositions'],
        queryFn: () => { 
            console.log(Date.now(), 'AutoRefreshAccruedPositions')
            dispatch(accruedPositionsReset()) 
            return Promise.resolve(true)
        },
        refetchInterval:  REFRESH_INTERVAL,
    })
}