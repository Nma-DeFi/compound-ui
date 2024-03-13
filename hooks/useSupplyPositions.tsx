import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { supplyPositionsInit } from "../redux/slices/positions/supplyPositions"
import { useCurrentAccount } from "./useCurrentAccount"

export function useSupplyPositions() {

    const supplyPositions = useAppSelector(state => state.supplyPositions)
    const { isConnected } = useCurrentAccount()
    const dispatch = useAppDispatch()

    const { isIdle: isNoSupplyPositions } = supplyPositions

    useEffect(() => { 
        if (isConnected && isNoSupplyPositions) {
          dispatch(supplyPositionsInit())
        } 
    }, [isConnected, isNoSupplyPositions])

    return supplyPositions
}