import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { baseToken, cometProxy  } from "../selectors/market-selector"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { bnf } from "../utils/bn"
import { usePrice } from "../hooks/usePrice"
import { useSupplyBalance } from "../hooks/useSupplyBalance"
import { usePublicClient, useWalletClient } from "wagmi"

export default function SupplyBalance(market) {

    const { address: account } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const comet = cometProxy(market)
    
    const { 
        isSuccess: isSuccessBalance, 
        data: balance
    } = useSupplyBalance({ comet, publicClient, walletClient, account})

    const { 
        isSuccess: isSuccessPrice, 
        data: price 
    } = usePrice({ token: baseToken(market) })

    return isSuccessBalance ? (
        <>
            <div className="mb-1">{ bnf(isSuccessBalance ? balance : 0)}</div>
            <small className="text-body-secondary">${ bnf(isSuccessBalance && isSuccessPrice ? balance.times(price) : 0) }</small>
        </>
    ) : (
        <>
            <div className="mb-1">—</div>
            <small className="text-body-secondary">—</small>
        </>
    )
}
