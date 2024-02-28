import { connect } from "react-redux"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { RootState } from "../redux/types"
import { baseTokePriceFeed, cometProxy } from "../selectors/market-selector"
import Amount from "./Amount"
import { NoData } from "./Layout"
import PriceAsync from "./PriceAsync"

const AMOUNT_DP = 2

export function SupplyBalance({ market, isLoading, isSuccess, supplyBalance }) {

    const { isConnected } = useCurrentAccount()
    
    return isConnected 
        ? <SupplyBalanceAmount {...{ isLoading, isSuccess, amount: supplyBalance, market }} /> 
        : <NoSupplyBalance />
}

const SupplyBalanceAmount = ({ isLoading, isSuccess, amount, market }) => (
    <>
        { isLoading ? (
            <>
                <div className="mb-1"><div className="placeholder bg-secondary-subtle col-5"></div></div>
                <div className="placeholder placeholder-sm bg-secondary-subtle col-5"></div>
            </>
        ) : isSuccess ? (
            <>
                <div className="mb-1"><Amount value={amount} config={{ dp: AMOUNT_DP, trimZeros: false}} /></div>
                <small className="text-body-secondary">
                    <PriceAsync comet={cometProxy(market)} priceFeed={baseTokePriceFeed(market)} amount={amount} />
                </small>
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


