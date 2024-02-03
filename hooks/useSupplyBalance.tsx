import BigNumber from "bignumber.js"
import { useEffect, useState } from "react"
import { AsyncStatus, AsyncStatusType } from "../redux/types"
import { Zero, bnf } from "../utils/bn"
import { usePositionsService } from "./usePositionsService"

type BalanceData = { data: BigNumber } & AsyncStatusType

const IdleBalance: BalanceData = {
    data: Zero,
    ...AsyncStatus.Idle
}

export function useSupplyBalance({ comet, publicClient, account }) {
    
    const [ balance, setBalance ] = useState<BalanceData>(IdleBalance)

    const positionsService = usePositionsService({ comet, publicClient })

    useEffect(() => {
        console.log('update balance', 
        'idle', balance.isIdle,
        'loading', balance.isLoading,
        'success', balance.isSuccess,
        'error', balance.isError,
        bnf(balance.data))
    }, [balance])

    useEffect(() => {
        if (positionsService && account) {
            setBalance({ data: Zero, ...AsyncStatus.Loading})
            positionsService.supplyBalanceOf(account)
                .then(balance => setBalance({ data: balance, ...AsyncStatus.Success}))
                .catch(() => setBalance({ data: Zero, ...AsyncStatus.Error}))
        } else {
            setBalance(IdleBalance)
        }
    }, [positionsService, account])

    return balance
}
