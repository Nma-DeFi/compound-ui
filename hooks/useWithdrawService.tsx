import { useEffect, useState } from "react";
import { WithdrawService } from "../services/withdraw-service"

export function useWithdrawService({ comet, publicClient, walletClient, account }) : WithdrawService {
    
    const [ withdrawService, setWithdrawService ] = useState<WithdrawService>()

    useEffect(() => {
        if (comet && publicClient && walletClient && account) {
            const service = new WithdrawService({ comet, publicClient, walletClient, account })
            setWithdrawService(service)
        } else {
            setWithdrawService(null)
        }
    }, [comet, publicClient, walletClient, account])

    return withdrawService
}