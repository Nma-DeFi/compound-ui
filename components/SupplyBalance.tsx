import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { usePrice } from "../hooks/usePrice"
import { RootState } from "../redux/types"
import { baseToken, cometProxy } from "../selectors/market-selector"
import { Zero, bnf } from "../utils/bn"

export function SupplyBalance({ market, isSuccessBalance, balance }) {
    
    const [ strBalance, setStrBalance] = useState<string>()
    const [ strPrice, setStrPrice] = useState<string>()

    const { isConnected } = useCurrentAccount()
    
    const {  
        isSuccess: isSuccessPrice, 
        data: price 
    } = usePrice({ token: baseToken(market) })

    useEffect(() => {
        if (isSuccessBalance) {
            setStrBalance(bnf(balance))
        } else {
            setStrBalance('—')
        }
    }, [isSuccessBalance])

    useEffect(() => {
        if (isSuccessPrice && isSuccessBalance) {
            const priceValue = balance.times(price)
            setStrPrice(`$${bnf(priceValue)}`)
        } else {
            setStrPrice('—')
        }
    }, [isSuccessPrice, isSuccessBalance])

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
    const { isSuccess: isSuccessBalance, data: positions } = state.supplyPositions
    const comet = cometProxy(market) 
    const balance = positions?.[comet].supplyBalance || Zero
    return { isSuccessBalance, balance }
}
export default connect(mapStateToProps)(SupplyBalance)