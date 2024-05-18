import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useCurrentAccount } from "./useCurrentAccount"
import { RewardsOwedState, rewardsOwedInit } from "../redux/slices/rewardsOwed"

export function useRewardsOwed(): RewardsOwedState {

  const { isConnected } = useCurrentAccount()

    const rewardsOwed = useAppSelector(state => state.rewardsOwed)
    const dispatch = useAppDispatch()

    const { isIdle: isNoRewardsOwed } = rewardsOwed

    useEffect(() => { 
        if (isConnected && isNoRewardsOwed) {
          dispatch(rewardsOwedInit())
        } 
    }, [isConnected, isNoRewardsOwed])

    return rewardsOwed
}