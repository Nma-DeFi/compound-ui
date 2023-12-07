import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { CHAINS, networkIcon, networkName } from "../networks";
import styles from '../styles/components/network-selector.module.scss';


export default function NetworkSelector({currentId, onChange}) {

    const { chain } = useNetwork();
    const { isConnected } = useAccount();
    const { switchNetwork } = useSwitchNetwork();

    function currentNetwork() {
        return isConnected ? chain.id : currentId;
    }

    function changeNetwork(id) {
        if (isConnected) { 
            switchNetwork(id);
        }
        onChange(id);
    }

    return (
            <div id="network-dropdown" className="btn-group w-100" role="group">
                <button id="network-select" type="button" className={`${styles['network-select']} btn btn-light bg-body btn-lg border shadow rounded-5 dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex justify-content-around fs-5">
                        <img className={`${styles['icon']} d-none d-xl-inline`} src={networkIcon(currentNetwork())} alt="networks" />
                        <div>{networkName(currentNetwork())}</div>
                        <div className={styles['chevron']}><i className="bi bi-chevron-down"></i></div>
                    </div>
                </button>
                <ul id="network-menu" className="dropdown-menu w-100">
                {CHAINS.map(chain => (
                    <li key={chain.id} className={styles['network-menu-item']} >
                        <button 
                            className="dropdown-item" 
                            type="button" 
                            onClick={() => changeNetwork(chain.id)}>
                                <img className={styles['network-menu-icon']} src={networkIcon(chain.id)} alt="Network icon" /> 
                                {networkName(chain.id)}
                        </button>
                    </li>
                ))}
                </ul>
            </div>
        );
}