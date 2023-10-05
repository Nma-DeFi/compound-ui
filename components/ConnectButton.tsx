import Head from 'next/head';
import NavLink from './NavLink';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { truncateAddress } from '../utils/page';

export default function ConnectButton() {

    const { open: openWeb3Modal } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return isConnected ? (
            <>
                <button className="btn btn-primary text-white shadow-sm me-2" type="button"><i className="bi bi-wallet me-1"></i> { truncateAddress(address) }</button>
                <button className="btn btn-primary text-white shadow-sm" type="button" onClick={() => disconnect()}><i className="bi bi-power"></i></button>
            </>
        ) : (
            <button className="btn btn-primary text-white shadow-sm" type="button" onClick={() => openWeb3Modal()}>
                <i className="bi bi-wallet me-1"></i> Connect wallet
            </button>
        );
}