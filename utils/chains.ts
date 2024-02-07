import { CompoundConfig } from '../compound-config';
import { arbitrum, goerli } from 'wagmi/chains';

export const CHAINS = Object.values(CompoundConfig).map(cfg => cfg.chain)

const CHAIN_ICON_PATH = '/images/networks'
const ARB_SHORT_NAME = 'Arbitrum'

export function chainFromId(id: number) {
    return CHAINS.find(c => c.id === id)
}

export function chainIcon(id: number) {
    const chain = chainFromId(id)
    return chain ? `${CHAIN_ICON_PATH}/${chain.id}.svg` : ''
}

export function chainName(id: number) {
    return id === arbitrum.id ? ARB_SHORT_NAME : chainFromId(id)?.name
}

export function isTestnet(id: number) {
    return id === goerli.id
}

export function isUnsupportedChain(id: number) {
    return !chainFromId(id)
}

export function nativeCurrency(id: number) {
    return chainFromId(id).nativeCurrency
}

export function wrappedNativeToken(id: number) {
    return CompoundConfig[id].contracts.wrappedNativeToken
}

export function enhanceChain(chain) {
    return {
        ...chain,
        shortName: chainName(chain.id),
        icon: chainIcon(chain.id),
        isTestnet: isTestnet(chain.id),
    }
}

export function transactionUrl({ chainId, txHash }) {
    const blockExplorer = chainFromId(chainId).blockExplorers.default.url
    return `${blockExplorer}/tx/${txHash}`
}

export function fixGoerliRpc(chainId: number) {
    return chainId === goerli.id
        ? process.env.NEXT_PUBLIC_GOERLI_RPC
        : undefined
}
