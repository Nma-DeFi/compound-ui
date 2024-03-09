import { useEffect } from "react"
import { Chain } from "viem"
import { Address, useAccount, useNetwork } from "wagmi"
import { useAppDispatch } from "../redux/hooks"
import { accountConnected, accountDisconnected } from "../redux/slices/currentAccount"
import { chainSwitched } from "../redux/slices/currentChain"
import { supplyPositionsReset } from "../redux/slices/positions/supplyPositions"
import { collateralPositionsReset } from "../redux/slices/positions/collateralPositions"
import { borrowPositionsReset } from "../redux/slices/positions/borrowPositions"


export const resetPositions = (dispatch) => {
    dispatch(supplyPositionsReset())
    dispatch(borrowPositionsReset())
    dispatch(collateralPositionsReset())
}

export const resetConnectedAccount = (dispatch) => {
    dispatch(accountDisconnected())
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

