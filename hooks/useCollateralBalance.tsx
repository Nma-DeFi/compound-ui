import BigNumber from "bignumber.js"
import { useEffect, useState } from "react"
import { AsyncData, IdleData, loadAsyncData } from '../utils/async'
import { usePositionsService } from "./usePositionsService"

type BalanceData = AsyncData<BigNumber>

export function useCollateralBalance({ comet, publicClient, account, token }) {
    
    const [ balance, setBalance ] = useState<BalanceData>(IdleData)

    const positionsService = usePositionsService({ comet, publicClient })

    useEffect(() => {
        if (positionsService && account && token) {
            const promise = positionsService.collateralBalanceOf({ account, token })
            loadAsyncData(promise, setBalance)
        } else {
            setBalance(IdleData)
        }
    }, [positionsService, account, token])

    return balance
}
