import { connect } from "react-redux"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { RootState } from "../redux/types"
import { baseToken, cometProxy } from "../selectors/market-selector"
import Amount from "./Amount"
import { NoData } from "./Layout"
import Price from "./Price"


export function SupplyBalance({ market, isLoading, isSuccess, supplyBalance }) {

    const { isConnected } = useCurrentAccount()
    
    return isConnected 
        ? <SupplyBalanceAmount {...{ isLoading, isSuccess, amount: supplyBalance, token: baseToken(market) }} /> 
        : <NoSupplyBalance />
}

const SupplyBalanceAmount = ({ isLoading, isSuccess, amount, token }) => (
    <>
        { isLoading ? (
            <>
                <div className="mb-1"><div className="placeholder bg-secondary-subtle col-5"></div></div>
                <div className="placeholder placeholder-sm bg-secondary-subtle col-5"></div>
            </>
        ) : isSuccess ? (
            <>
                <div className="mb-1"><Amount value={amount} config={{ dp: 2, trimZeros: false}} /></div>
                <small className="text-body-secondary"><Price asset={token} amount={amount} /></small>
            </>
        ) : (
            <NoSupplyBalance />
        )}
    </>
)

const NoSupplyBalance = () => (
    <>
        <div className="mb-1">{NoData}</div>
        <small className="text-body-secondary">{NoData}</small>
    </>
)

const mapStateToProps = (state: RootState, { market }) => {
    const { isLoading, isSuccess, data: positions } = state.supplyPositions
    const comet = cometProxy(market) 
    const supplyBalance = positions?.[comet].supplyBalance
    return { isLoading, isSuccess, supplyBalance }
}
export default connect(mapStateToProps)(SupplyBalance)


