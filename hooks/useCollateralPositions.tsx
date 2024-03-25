import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useCurrentAccount } from "./useCurrentAccount"
import { CollateralPositionsState, collateralPositionsInit } from "../redux/slices/positions/collateralPositions"

export function useCollateralPositions() : CollateralPositionsState {

    const collateralPositions = useAppSelector(state => state.collateralPositions)
    const { isConnected } = useCurrentAccount()
    const dispatch = useAppDispatch()

    useEffect(() => { 
        if (isConnected && collateralPositions.isIdle) {
          dispatch(collateralPositionsInit())
        } 
      }, [isConnected, collateralPositions])

    return collateralPositions
}