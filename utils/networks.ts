import { arbitrum, mainnet, polygon, base } from 'wagmi/chains';

const NET_ICON_PATH = '/images/networks';
const ARB_SHORT_NAME = 'Arbitrum';

export const CHAINS = [ mainnet, arbitrum, polygon, base ];

export function findNetwork(id: number) {
    return CHAINS.find(c => c.id === id);
}

export function networkIcon(id: number) {
    const network = findNetwork(id);
    return network ? `${NET_ICON_PATH}/${network.id}.svg` : null;
}

export function networkName(id: number) {
    return id === arbitrum.id ? ARB_SHORT_NAME : findNetwork(id)?.name;
}
