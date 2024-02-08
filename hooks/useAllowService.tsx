import { useEffect, useState } from "react";
import { AllowService } from "../services/allow-service";

export function useAllowService({ comet, publicClient, walletClient, account }) : AllowService {
    
    const [ allowService, setAllowService ] = useState<AllowService>()

    useEffect(() => {
        if (comet && publicClient && walletClient && account) {
            const service = new AllowService({ comet, publicClient, walletClient, account })
            setAllowService(service)
        } else {
            setAllowService(null)
        }
    }, [comet, publicClient, walletClient, account])

    return allowService
}