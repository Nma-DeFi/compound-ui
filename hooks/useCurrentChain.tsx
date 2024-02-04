import { mainnet, useNetwork } from "wagmi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { chainSwitched } from "../redux/slices/currentChain";
import { useCurrentAccount } from "./useCurrentAccount";

export function useCurrentChain() {

    const { isConnected } = useCurrentAccount()
    const { chain: connectedChain } = useNetwork()

    const dispatch = useAppDispatch()

    let currentChainId = useAppSelector(state => state.currentChain.chainId)
    if (currentChainId === undefined) {
        currentChainId = isConnected ? connectedChain.id : mainnet.id
        dispatch(chainSwitched(currentChainId))
    }

    return { currentChainId }
}
