import { Address, useAccount, useNetwork } from "wagmi"
import { useAppDispatch } from "../redux/hooks"
import { accountConnected, accountDisconnected } from "../redux/slices/currentAccount"
import { chainSwitched } from "../redux/slices/currentChain"
import { supplyPositionsInit, supplyPositionsReset } from "../redux/slices/supplyPositions"
import { useEffect } from "react"

export function useNetworkEvents() {

    const { chain } = useNetwork()
    const dispatch = useAppDispatch()


    const onConnect = ({ address, connector, isReconnected }) => {
        console.log('onConnect', address, chain, isReconnected)
        dispatch(chainSwitched(chain.id))
        dispatch(accountConnected(address))
        dispatch(supplyPositionsInit())
    }

    const onDisconnect = () => {
        dispatch(accountDisconnected())
        dispatch(supplyPositionsReset())
    }

    const { address } = useAccount({ onConnect, onDisconnect })

    const onAccountChanged = (address: Address) => {
        console.log('onAccountChanged', address, chain?.id)
    }
    useEffect(() => onAccountChanged(address), [address])

    /*const onChainChanged = (newChain: Chain) => {
    }
    useEffect(() => onChainChanged(chain), [chain])*/
}
