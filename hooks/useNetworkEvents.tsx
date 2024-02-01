import { Chain, useAccount, useNetwork } from "wagmi"
import { useAppDispatch } from "../redux/hooks"
import { accountConnected, accountDisconnected } from "../redux/slices/currentAccount"
import { useCurrentChain } from "./useCurrentChain"
import { useEffect } from "react"


export function useNetworkEvents() {

    const { chain } = useNetwork()
    const { setCurrentChainId } = useCurrentChain()
    const dispatch = useAppDispatch()

    const onConnect = ({ address, connector, isReconnected }) => {
        //console.log('onConnect', chain, address, connector, isReconnected)
        dispatch(accountConnected(address))
        setCurrentChainId(chain.id)
    }

    const onDisconnect = () => dispatch(accountDisconnected())

    const onChainChanged = (newChain: Chain) => {
        //console.log('onChainChanged', newChain)
        if (newChain) {
            setCurrentChainId(newChain.id)
        }
    }

    //useEffect(() => onChainChanged(chain), [chain])

    useAccount({ onConnect, onDisconnect })
}
