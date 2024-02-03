import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { usePrice } from "../hooks/usePrice"
import { RootState } from "../redux/types"
import { baseToken, cometProxy } from "../selectors/market-selector"
import { Zero, bnf } from "../utils/bn"

export function SupplyBalance({ market, balanceStatus, balance }) {
    
    const [ strBalance, setStrBalance] = useState<string>()
    const [ strPrice, setStrPrice] = useState<string>()

    const { isConnected } = useCurrentAccount()
    
    useEffect(() => {
        console.log(Date.now(), 'SupplyBalance', baseToken(market)?.name, balanceStatus, bnf(balance))
    }, [market, balanceStatus, balance])

    const {  
        isSuccess: isSuccessPrice, 
        data: price 
    } = usePrice({ token: baseToken(market) })

    useEffect(() => {
        if (balanceStatus === 'success') {
            setStrBalance(bnf(balance))
        } else {
            setStrBalance('—')
        }
    }, [balanceStatus])

    useEffect(() => {
        if (isSuccessPrice && balanceStatus === 'success') {
            const _price = balance.times(price)
            setStrPrice(`$${bnf(_price)}`)
        } else {
            setStrPrice('—')
        }
    }, [isSuccessPrice, balanceStatus])

    return isConnected 
        ? <Balance balance={strBalance} price={strPrice}/> 
        : <Balance balance='—' price='—'/>
}

const Balance = ({ balance, price }) => (
    <>
        <div className="mb-1">{ balance }</div>
        <small className="text-body-secondary">{price }</small>
    </>
)

const mapStateToProps = (state: RootState, { market }) => {
    const { status: balanceStatus, positions } = state.supplyPositions
    const comet = cometProxy(market) 
    const balance = positions?.[comet] || Zero
    return { balanceStatus, balance }
}
export default connect(mapStateToProps)(SupplyBalance)