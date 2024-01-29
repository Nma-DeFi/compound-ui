import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useCurrentAccount } from '../hooks/useCurrentAccount'
import { useDisconnect } from 'wagmi'

export default function ConnectButton() {

    const { open: openWeb3Modal } = useWeb3Modal()
    const { address, isConnected } = useCurrentAccount()
    const { disconnect } = useDisconnect()

    
    const truncateAddress = (address: string) => {
        if (!address) return 'No Account'
        const match = address.match(
        /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
        )
        if (!match) return address
        return `${match[1]}....${match[2]}`
    }

    return isConnected ? (
            <>
                <button className="btn btn-primary text-white shadow-sm me-2" type="button"><i className="bi bi-wallet me-1"></i> { truncateAddress(address) }</button>
                <button className="btn btn-primary text-white shadow-sm" type="button" onClick={() => disconnect()}><i className="bi bi-power"></i></button>
            </>
        ) : (
            <button className="btn btn-primary text-white shadow-sm" type="button" onClick={() => openWeb3Modal()}>
                <i className="bi bi-wallet me-1"></i> Connect wallet
            </button>
        )
}