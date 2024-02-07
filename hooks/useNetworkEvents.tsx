import { useAccount, useNetwork } from "wagmi"
import { useAppDispatch } from "../redux/hooks"
import { accountConnected, accountDisconnected } from "../redux/slices/currentAccount"
import { chainSwitched } from "../redux/slices/currentChain"
import { supplyPositionsInit } from "../redux/slices/supplyPositions"
import { useCurrentChain } from "./useCurrentChain"

export function useNetworkEvents() {

    const { chain } = useNetwork()
    const dispatch = useAppDispatch()

    const onConnect = ({ address, connector, isReconnected }) => {
        console.log('onConnect', address, chain, isReconnected)
        dispatch(accountConnected(address))
        dispatch(chainSwitched(chain.id))
        dispatch(supplyPositionsInit())
    }

    const onDisconnect = () => dispatch(accountDisconnected())

    /*const onChainChanged = (newChain: Chain) => {
        if (newChain) {}
    }
    useEffect(() => onChainChanged(chain), [chain])*/

    useAccount({ onConnect, onDisconnect })
}