import { CHAINS, networkIcon, networkName } from "../utils/networks";
import styles from '../styles/components/network-selector.module.scss';
import { useCurrentChain } from "../hooks/useCurrentChain";

export default function NetworkSelector() {

    const { currentChainId, setCurrentChainId } = useCurrentChain();

    return (
            <div id="network-dropdown" className="btn-group w-100" role="group">
                <button id="network-select" type="button" className={`${styles['network-select']} btn btn-light bg-body btn-lg border shadow rounded-5 dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex justify-content-around fs-5">
                        <img className={`${styles['icon']} d-none d-xl-inline`} src={networkIcon(currentChainId)} alt="networks" />
                        <div>{networkName(currentChainId)}</div>
                        <div className={styles['chevron']}><i className="bi bi-chevron-down"></i></div>
                    </div>
                </button>
                <ul id="network-menu" className="dropdown-menu w-100">
                {CHAINS.map(chain => (
                    <li key={chain.id} className={styles['network-menu-item']} >
                        <button 
                            className="dropdown-item" 
                            type="button" 
                            onClick={() => setCurrentChainId(chain.id)}>
                                <img className={styles['network-menu-icon']} src={networkIcon(chain.id)} alt="Network icon" /> 
                                {networkName(chain.id)}
                        </button>
                    </li>
                ))}
                </ul>
            </div>
        );
}