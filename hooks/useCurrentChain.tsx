import { mainnet, useNetwork, useSwitchNetwork } from "wagmi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { chainSwitched } from "../redux/slices/currentChain";
import { useCurrentAccount } from "./useCurrentAccount";
import { useEffect } from "react";
import { isUnsupportedChain } from "../utils/chains";

export function useCurrentChain() {

    const { isConnected } = useCurrentAccount()
    const { chain: connectedChain } = useNetwork()
    const { 
        data,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        pendingChainId,
        switchNetwork,
        switchNetworkAsync,
    } = useSwitchNetwork({
        onMutate(args) {
            //console.log('SwitchNetwork.onMutate', args)
        },
        onSuccess(data) {
            //console.log('SwitchNetwork.onSuccess', data)
        },
        onError(error) {
            //console.log('SwitchNetwork.onError', error)
        },
    })

    /*useEffect(() => {
        console.log('isError,isIdle,isLoading,isSuccess,pendingChainId,data,error')
        console.log(
            isError,
            isIdle,
            isLoading,
            isSuccess,
            pendingChainId,
            data,
            error,
        )
    }, [data,
        error,
        isError,
        isIdle,
        isLoading,
        isSuccess,
        pendingChainId])*/

    const dispatch = useAppDispatch()

    let currentChainId = useAppSelector(state => state.currentChain.chainId)
    if (currentChainId === undefined) {
        currentChainId = isConnected ? connectedChain.id : mainnet.id
        dispatch(chainSwitched(currentChainId))
    }

    const setCurrentChainId = (newChainId: number) => {
        /*console.log('setCurrentChain', 
            'newId', newChainId, 
            'currentId', currentChainId, 
            'isUnsupportedChain', isUnsupportedChain(newChainId))*/
        if (newChainId === currentChainId || isUnsupportedChain(newChainId)) return
        //console.log('setCurrenChain', 'setting chain', newChainId, isConnected)
        if (isConnected && (connectedChain.id !== newChainId)) { 
            switchNetworkAsync(newChainId)
                .then(chain => { 
                    //console.log('setCurrenChain switched chain', chain)
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