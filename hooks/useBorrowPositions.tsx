import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { borrowPositionsInit } from "../redux/slices/positions/borrowPositions"
import { useCurrentAccount } from "./useCurrentAccount"

export function useBorrowPositions() {

    const borrowPositions = useAppSelector(state => state.borrowPositions)
    const { isConnected } = useCurrentAccount()
    const dispatch = useAppDispatch()

    const { isIdle: isNoBorrowPositions } = borrowPositions

    useEffect(() => { 
        if (isConnected && isNoBorrowPositions) {
          dispatch(borrowPositionsInit())
        } 
    }, [isConnected, isNoBorrowPositions])

    return borrowPositions
}