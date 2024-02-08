import BigNumber from "bignumber.js"
import { useEffect, useState } from "react"
import { AsyncData, IdleData, asyncExec } from '../utils/async'
import { usePositionsService } from "./usePositionsService"

type BalanceData = AsyncData<BigNumber>

export function useSupplyBalance({ comet, publicClient, account }) {
    
    const [ balance, setBalance ] = useState<BalanceData>(IdleData)

    const positionsService = usePositionsService({ comet, publicClient })

    useEffect(() => {
        if (positionsService && account) {
            const promise = positionsService.supplyBalanceOf(account)
            asyncExec(promise, setBalance)
        } else {
            setBalance(IdleData)
        }
    }, [positionsService, account])

    return balance
}
