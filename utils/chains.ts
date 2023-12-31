import { COMPOUND_CONFIG } from '../compound-config';
import { arbitrum, goerli } from 'wagmi/chains';

export const CHAINS = Object.values(COMPOUND_CONFIG).map(cfg => cfg.chain);

const CHAIN_ICON_PATH = '/images/networks';
const ARB_SHORT_NAME = 'Arbitrum';

export function findChain(id: number) {
    return CHAINS.find(c => c.id === id);
}

export function chainIcon(id: number) {
    const chain = findChain(id);
    return chain ? `${CHAIN_ICON_PATH}/${chain.id}.svg` : '';
}

export function chainName(id: number) {
    return id === arbitrum.id ? ARB_SHORT_NAME : findChain(id)?.name;
}

export function isTestnet(id: number) {
    return id === goerli.id;
}

export function enhanceChain(chain) {
    return {
        ...chain,
        shortName: chainName(chain.id),
        icon: chainIcon(chain.id),
        isTestnet: isTestnet(chain.id),
    }
}
