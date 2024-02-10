import { connect } from "react-redux"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { RootState } from "../redux/types"
import { baseToken, cometProxy } from "../selectors/market-selector"
import Amount from "./Amount"
import Price from "./Price"


export function SupplyBalance({ market, balance }) {

    const { isConnected } = useCurrentAccount()
    
    return isConnected 
        ? <Balance amount={balance} token={baseToken(market)} /> 
        : <NoBalance />
}

const Balance = ({ amount, token }) => (
    <>
        <div className="mb-1"><Amount value={amount} config={{ dp: 2, trimZeros: false}} /></div>
        <small className="text-body-secondary"><Price asset={token} amount={amount} /></small>
    </>
)

const NoBalance = () => (
    <>
        <div className="mb-1">—</div>
        <small className="text-body-secondary">—</small>
    </>
)

const mapStateToProps = (state: RootState, { market }) => {
    const { data: positions } = state.supplyPositions
    const comet = cometProxy(market) 
    const balance = positions?.[comet].supplyBalance
    return { balance }
}
export default connect(mapStateToProps)(SupplyBalance)


