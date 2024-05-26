import { useEffect } from "react"
import { Chain } from "viem"
import { Address, useAccount, useNetwork } from "wagmi"
import { useAppDispatch } from "../redux/hooks"
import { accountConnected, accountDisconnected } from "../redux/slices/currentAccount"
import { chainSwitched } from "../redux/slices/currentChain"
import { accruedPositionsReset } from '../redux/helpers/common'
import { collateralPositionsReset } from "../redux/slices/positions/collateralPositions"
import { rewardsOwedReset } from "../redux/slices/rewardsOwed"


export const resetPositions = (dispatch) => {
    dispatch(accruedPositionsReset())
    dispatch(collateralPositionsReset())
}

export const resetConnectedAccount = (dispatch) => {
    dispatch(accountDisconnected())
    dispatch(rewardsOwedReset())
    resetPositions(dispatch)
}

export function useNetworkEvents() {

    const { chain } = useNetwork()
    const dispatch = useAppDispatch()

    const onDisconnect = () => {
        resetConnectedAccount(dispatch)
    }
    const { address } = useAccount({ onDisconnect })

    const onAccountChanged = (newAccount: Address) => {
        if (newAccount) {
            dispatch(accountConnected(newAccount))
            resetPositions(dispatch)
        }
    }
    useEffect(() => onAccountChanged(address), [address])

    const onChainChanged = (newChain: Chain) => {
        if (newChain) {
            dispatch(chainSwitched(newChain.id))
            resetPositions(dispatch)
        }
    }
    useEffect(() => onChainChanged(chain), [chain])
}

