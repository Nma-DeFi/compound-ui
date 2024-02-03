import { mainnet, useNetwork, useSwitchNetwork } from "wagmi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { chainSwitched } from "../redux/slices/currentChain";
import { isUnsupportedChain } from "../utils/chains";
import { useCurrentAccount } from "./useCurrentAccount";

export function useCurrentChain() {

    const { isConnected } = useCurrentAccount()
    const { chain: connectedChain } = useNetwork()

    const { 
        switchNetworkAsync,
    } = useSwitchNetwork({
        onMutate(args) {},
        onSuccess(data) {},
        onError(error) {},
    })

    const dispatch = useAppDispatch()

    let currentChainId = useAppSelector(state => state.currentChain.chainId)
    if (currentChainId === undefined) {
        currentChainId = isConnected ? connectedChain.id : mainnet.id
        dispatch(chainSwitched(currentChainId))
    }

    const setCurrentChainId = (newChainId: number) => {
        if (newChainId === currentChainId || isUnsupportedChain(newChainId)) return
        if (isConnected && (connectedChain.id !== newChainId)) { 
            switchNetworkAsync(newChainId)
                .then(chain => { 
                    dispatch(chainSwitched(chain.id))
                })
                .catch(error => {
                    if (error.name !== 'UserRejectedRequestError') throw error
                })
        } else {
            dispatch(chainSwitched(newChainId))
        }
    }
    
    return { currentChainId, setCurrentChainId }
}
