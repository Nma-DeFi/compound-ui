import { useEffect } from "react"
import { createPublicClient, http } from "viem"
import { Address, useAccount, useNetwork } from "wagmi"
import { useAppDispatch } from "../redux/hooks"
import { accountConnected, accountDisconnected } from "../redux/slices/currentAccount"
import { chainSwitched } from "../redux/slices/currentChain"
import { supplyPositionsInitFromParam, supplyPositionsReset } from "../redux/slices/supplyPositions"
import { chainFromId, fixGoerliRpc } from "../utils/chains"

export function useNetworkEvents() {

    const { chain } = useNetwork()
    const dispatch = useAppDispatch()

    const onConnect = () => {
        dispatch(chainSwitched(chain.id))
    }

    const onDisconnect = () => {
        dispatch(accountDisconnected())
        dispatch(supplyPositionsReset())
    }

    const { address } = useAccount({ onConnect, onDisconnect })

    const onAccountChanged = (newAccount: Address) => {
        if (newAccount) {
            const publicClient = createCustomPublicClient(chain.id)
            dispatch(accountConnected(newAccount))
            dispatch(supplyPositionsInitFromParam({address: newAccount, chainId: chain.id, publicClient }))
        }
    }
    
    useEffect(() => onAccountChanged(address), [address])
}

export function createCustomPublicClient(chainId: number) {
    return createPublicClient({
        chain: chainFromId(chainId),
        transport: http(fixGoerliRpc(chainId)),
    })
}
