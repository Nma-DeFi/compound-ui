import { useNetwork } from "wagmi"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { resetConnectedAccount } from "./useNetworkEvents"
import { NotConnected } from "../redux/slices/currentAccount"

export function useCurrentAccount() {

    const { chain: connectedChain } = useNetwork()
    const currentAccount = useAppSelector(state => state.currentAccount)
    const dispatch = useAppDispatch()
    
    if (currentAccount.isConnected && !connectedChain) {
        resetConnectedAccount(dispatch)
        return NotConnected
    } else {
        return currentAccount
    }
}