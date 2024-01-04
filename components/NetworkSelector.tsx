import { CHAINS, enhanceChain, chainIcon, chainName } from "../utils/chains";
import styles from '../styles/components/NetworkSelector.module.scss';
import { useCurrentChain } from "../hooks/useCurrentChain";
import { useEffect, useState } from "react";

export default function NetworkSelector() {

    const [ chainList, setChainList ] = useState([]);
    const { currentChainId, setCurrentChainId } = useCurrentChain();

    useEffect(() => {
        const comparator = (c1, c2) => {
            if (c1.isTestnet) {
                return 1;
            } else if (c2.isTestnet) {
                return -1;
            } else {
                return 0;
            }
        }
        const chains = CHAINS.map(enhanceChain).sort(comparator);    
        setChainList(chains);
    }, []);

    return (
            <div id="network-dropdown" className="btn-group w-100" role="group">
                <button id="network-select" type="button" className={`${styles['network-select']} btn btn-light bg-body btn-lg border shadow rounded-5 dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex justify-content-around fs-5">
                        <img className={`${styles['icon']} d-none d-xl-inline`} src={chainIcon(currentChainId)} alt="networks" />
                        <div>{chainName(currentChainId)}</div>
                        <div className={styles['chevron']}><i className="bi bi-chevron-down"></i></div>
                    </div>
                </button>
                <ul id="network-menu" className="dropdown-menu w-100">
                {chainList.map(chain => (
                    <li key={chain.id} className={styles['network-menu-item']} >
                        <button 
                            className="dropdown-item" 
                            type="button" 
                            onClick={() => setCurrentChainId(chain.id)}>
                            <div className="d-flex align-items-center">
                                <img className={styles['network-menu-icon']} src={chain.icon} alt="Network icon" /> 
                                {chain.shortName}
                                {chain.isTestnet && <span className="ms-auto fs-6 text-warning">(Testnet)</span> }
                            </div>
                        </button>
                    </li>
                ))}
                </ul>
            </div>
        );
}