import { useEffect, useState } from "react";
import { AllowanceService } from "../services/allowance-service";

export function useAllowanceService({ comet, publicClient, walletClient, account }) : AllowanceService {
    
    const [ allowService, setAllowService ] = useState<AllowanceService>()

    useEffect(() => {
        if (comet && publicClient && walletClient && account) {
            const service = new AllowanceService({ comet, publicClient, walletClient, account })
            setAllowService(service)
        } else {
            setAllowService(null)
        }
    }, [comet, publicClient, walletClient, account])

    return allowService
}