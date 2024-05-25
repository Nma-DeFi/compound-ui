import { useEffect, useState } from "react";
import { useSwitchNetwork } from "wagmi";
import { useCurrentAccount } from "../hooks/useCurrentAccount";
import { useCurrentChain } from "../hooks/useCurrentChain";
import { useAppDispatch } from "../redux/hooks";
import { chainSwitched } from "../redux/slices/currentChain";
import styles from '../styles/components/NetworkSelector.module.scss';
import { chainIcon, chainName, orderedChainList } from "../utils/chains";
import { useBootstrap } from "../hooks/useBootstrap";

export const USER_REJECTED_TX = 'UserRejectedRequestError';

export default function NetworkSelector({ id = 'chain-selector', fontSize = '110%', collapseNavbar = false }) {

    const { currentChainId } = useCurrentChain()
    const { isConnected } = useCurrentAccount()
    const { switchNetworkAsync } = useSwitchNetwork()

    const [ chainList, setChainList ] = useState([])

    const dispatch = useAppDispatch()

    const { getOrCreateCollapse } = useBootstrap()

    useEffect(() => {
        if (!getOrCreateCollapse || !collapseNavbar) return
        const menuToggle = document.getElementById('navbarSupportedContent')
        if (menuToggle) {
            const bsCollapse = getOrCreateCollapse(menuToggle, { toggle: false })
            const chainSelector = document.getElementById(id)
            const chainLinks = chainSelector.querySelectorAll('.chain-link-item')
            chainLinks.forEach(l => l.addEventListener('click', () => bsCollapse.toggle()))
        }
    }, [getOrCreateCollapse])

    useEffect(() => {
        const chainList = orderedChainList()
        setChainList(chainList) 
    }, [])

    function setCurrentChain(newChainId: number) {
        if (newChainId === currentChainId) return
        if (isConnected) { 
            switchNetworkAsync(newChainId).catch(error => {
                    if (error.name !== USER_REJECTED_TX) throw error
                })
        } else {
            dispatch(chainSwitched(newChainId))
        }
    }

    return (
            <div id={id} className="network-dropdown btn-group w-100" role="group">
                <button type="button" className={`${styles['network-select']} network-combo btn btn-light bg-body btn-lg border shadow rounded-5 dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex justify-content-around fs-5">
                        <img className={`${styles['icon']} d-inline`} src={chainIcon(currentChainId)} alt="networks" />
                        <div>{chainName(currentChainId)}</div>
                        <div className={styles['chevron']}><i className="bi bi-chevron-down"></i></div>
                    </div>
                </button>
                <ul className="dropdown-menu w-100">
                {chainList.map(chain => (
                    <li key={chain.id} className={styles['network-menu-item']} style={{ fontSize }}>
                        <button 
                            className="dropdown-item chain-link-item" 
                            type="button" 
                            onClick={() => setCurrentChain(chain.id)}>
                            <div className="d-flex align-items-center">
                                <img className={styles['network-menu-icon']} src={chain.icon} alt="Network icon" /> 
                                {chain.shortName}
                                {chain.isTestnet && <span className="ms-auto fs-6 text-warning">Testnet</span> }
                            </div>
                        </button>
                    </li>
                ))}
                </ul>
            </div>
        )
}