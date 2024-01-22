import { SupplyService } from "../services/supply-service"
import { createPublicClient, createWalletClient, custom, http } from "viem"
import { chainFromId } from "../utils/chains"

export function useSupply({ chainId, account, comet }) {
    
    if (!account) return { supply: undefined }

    const publicClient = createPublicClient({
        chain: chainFromId(chainId),
        transport: http()
    })

    const walletClient = createWalletClient({
        chain: chainFromId(chainId),
        transport: custom(window.ethereum),
    })

    const service = new SupplyService({ publicClient, walletClient, account, comet })

    return { 
        supply: service.supply.bind(service),
        supplyBalanceOf: service.supplyBalanceOf.bind(service),
    }
}