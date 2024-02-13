import { useEffect } from "react"
import { Chain } from "viem"
import { Address, useAccount, useNetwork } from "wagmi"
import { useAppDispatch } from "../redux/hooks"
import { accountConnected, accountDisconnected } from "../redux/slices/currentAccount"
import { chainSwitched } from "../redux/slices/currentChain"
import { supplyPositionsReset } from "../redux/slices/supplyPositions"

export function useNetworkEvents() {

    const { chain } = useNetwork()
    const dispatch = useAppDispatch()

    const onDisconnect = () => {
        dispatch(accountDisconnected())
        dispatch(supplyPositionsReset())
    }
    const { address } = useAccount({ onDisconnect })

    const onAccountChanged = (newAccount: Address) => {
        if (newAccount) {
            dispatch(accountConnected(newAccount))
            dispatch(supplyPositionsReset())
        }
    }
    useEffect(() => onAccountChanged(address), [address])

    const onChainChanged = (newChain: Chain) => {
        if (newChain) {
            dispatch(chainSwitched(newChain.id))
            dispatch(supplyPositionsReset())
        }
    }
    useEffect(() => onChainChanged(chain), [chain])
}

