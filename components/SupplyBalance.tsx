import { useEffect, useState } from "react"
import { usePublicClient } from "wagmi"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { usePrice } from "../hooks/usePrice"
import { useSupplyBalance } from "../hooks/useSupplyBalance"
import { baseToken, cometProxy } from "../selectors/market-selector"
import { bnf } from "../utils/bn"


export default function SupplyBalance(market) {
    
    const [ balance, setBalance] = useState<string>()
    const [ price, setPrice] = useState<string>()

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const publicClient = usePublicClient({ chainId })

    const comet = cometProxy(market) 

    const { 
        isSuccess: isSuccessBalance, 
        data: _balance
    } = useSupplyBalance({ comet, publicClient, account })

    const {  
        isSuccess: isSuccessPrice, 
        data: _price 
    } = usePrice({ token: baseToken(market) })

    useEffect(() => {
        if (isSuccessBalance) {
            setBalance(bnf(_balance))
        } else {
            setBalance('—')
        }
    }, [isSuccessBalance])

    useEffect(() => {
        if (isSuccessPrice && isSuccessBalance) {
            const price = _balance.times(_price)
            setPrice(`$${bnf(price)}`)
        } else {
            setPrice('—')
        }
    }, [isSuccessPrice, isSuccessBalance])

    return isConnected 
        ? <Balance balance={balance} price={price}/> 
        : <Balance balance='—' price='—'/>
}

const Balance = ({ balance, price }) => (
    <>
        <div className="mb-1">{ balance }</div>
        <small className="text-body-secondary">{price }</small>
    </>
)

