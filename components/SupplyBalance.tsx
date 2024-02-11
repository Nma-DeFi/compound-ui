import { connect } from "react-redux"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { RootState } from "../redux/types"
import { baseToken, cometProxy } from "../selectors/market-selector"
import Amount from "./Amount"
import { NoData } from "./Layout"
import Price from "./Price"


export function SupplyBalance({ market, supplyBalance }) {

    const { isConnected } = useCurrentAccount()
    
    return isConnected 
        ? <SupplyBalanceAmount amount={supplyBalance} token={baseToken(market)} /> 
        : <NoSupplyBalance />
}

const SupplyBalanceAmount = ({ amount, token }) => (
    <>
        <div className="mb-1"><Amount value={amount} config={{ dp: 2, trimZeros: false}} /></div>
        <small className="text-body-secondary"><Price asset={token} amount={amount} /></small>
    </>
)

const NoSupplyBalance = () => (
    <>
        <div className="mb-1">{NoData}</div>
        <small className="text-body-secondary">{NoData}</small>
    </>
)

const mapStateToProps = (state: RootState, { market }) => {
    const { data: positions } = state.supplyPositions
    const comet = cometProxy(market) 
    const supplyBalance = positions?.[comet].supplyBalance
    return { supplyBalance }
}
export default connect(mapStateToProps)(SupplyBalance)


