import { SupplyService } from "../services/supply-service"
import { useEffect, useState } from "react"

export function useSupplyService({ chainId, publicClient, walletClient, account, comet }) : SupplyService {
    
    const [ supplyService, setSupplyService ] = useState<SupplyService>()

    useEffect(() => {
        if (chainId && publicClient && walletClient && account && comet) {
            const service = new SupplyService({ chainId, publicClient, walletClient, account, comet })
            setSupplyService(service)
        } else {
            setSupplyService(null)
        }
    }, [chainId, publicClient, walletClient, account, comet])

    return supplyService
}