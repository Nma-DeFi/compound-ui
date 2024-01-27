import { Erc20Service } from "../services/erc20-service";
import { useEffect, useState } from "react";

export function useErc20Service({ token, publicClient, walletClient, account }): Erc20Service {
    
    const [ erc20Service, setErc20Service ] = useState<Erc20Service>()

    useEffect(() => {
        if (token && publicClient) {
            const erc20service = new Erc20Service({ token, publicClient, walletClient, account })
            setErc20Service(erc20service)
        } else {
            setErc20Service(null)
        }
    }, [token, publicClient, walletClient, account])


    return erc20Service
}