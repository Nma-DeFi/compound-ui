import { mainnet, useNetwork, useSwitchNetwork } from "wagmi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { chainSwitched } from "../redux/slices/currentChain";
import { useCurrentAccount } from "./useCurrentAccount";
import { useEffect } from "react";

export function useCurrentChain() {

    const { isConnected } = useCurrentAccount()
    const { chain } = useNetwork()
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
            //console.log('onMutate', args)
        },
        onSuccess(data) {
            //console.log('onSuccess', data)
        },
        onError(error) {
            //console.log('onError', error)
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
        currentChainId = isConnected ? chain.id : mainnet.id
        dispatch(chainSwitched(currentChainId))
    }

    const setCurrentChainId = (id: number) => {
        if (isConnected) { 
            switchNetworkAsync(id)
                .then(chain => dispatch(chainSwitched(chain.id)))
                .catch(error => {
                    if (error.name !== 'UserRejectedRequestError') throw error
                })
        } else {
            dispatch(chainSwitched(id))
        }
    }
    
    return { currentChainId, setCurrentChainId }
}