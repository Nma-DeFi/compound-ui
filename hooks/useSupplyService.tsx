import { SupplyService } from "../services/supply-service"
import { useEffect, useState } from "react"

export function useSupplyService({ comet, publicClient, walletClient, account }) : SupplyService {
    
    const [ supplyService, setSupplyService ] = useState<SupplyService>()

    useEffect(() => {
        if (publicClient && walletClient && account && comet) {
            const service = new SupplyService({ comet, publicClient, walletClient, account })
            setSupplyService(service)
        } else {
            setSupplyService(null)
        }
    }, [comet, publicClient, walletClient, account])

    return supplyService
}