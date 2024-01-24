import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { cometProxy, baseToken  } from "../selectors/market-selector"
import { useSupply } from "../hooks/useSupply"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { bnf } from "../utils/bn"
import { usePrice } from "../hooks/usePrice"
import { useQuery } from "@tanstack/react-query"

export default function SupplyBalance(market) {

    const { isConnected, address: account } = useCurrentAccount()

    const comet = cometProxy(market)
    const token = baseToken(market)

    const { currentChainId: chainId } = useCurrentChain()
    const { supplyBalanceOf } = useSupply({ chainId, account, comet })

    const { 
        isSuccess: isSuccessPrice, 
        data: price 
    } = usePrice({ token })

    const { 
        isSuccess: isSuccessBalance, 
        data: balance 
    } = useQuery({
        queryKey: ['supplyBalanceOf', chainId, comet, account],
        queryFn: () => supplyBalanceOf(account),
        enabled: !!(isConnected && market),
    })

    return isSuccessBalance ? (
        <>
            <div className="mb-1">{ bnf(balance)}</div>
            <small className="text-body-secondary">${ bnf(isSuccessPrice ? balance.times(price) : 0) }</small>
        </>
    ) : (
        <>
            <div className="mb-1">—</div>
            <small className="text-body-secondary">—</small>
        </>
    )
}
