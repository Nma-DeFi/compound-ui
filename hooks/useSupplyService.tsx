import { SupplyService } from "../services/supply-service"
import { useEffect, useState } from "react"

export function useSupplyService({ publicClient, walletClient, account, comet }) : SupplyService {
    
    const [ supplyService, setSupplyService ] = useState<SupplyService>()

    useEffect(() => {
        if (publicClient && walletClient && account && comet) {
            const service = new SupplyService({ publicClient, walletClient, account, comet })
            setSupplyService(service)
        } else {
            setSupplyService(null)
        }
    }, [publicClient, walletClient, account, comet])

    return supplyService
}