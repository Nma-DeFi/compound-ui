import { connect } from "react-redux"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { RootState } from "../redux/types"
import { cometProxy } from "../selectors/market-selector"
import Amount from "./Amount"
import { NoData } from "./Layout"
import css from '../styles/components/CollateralBalance.module.scss';


export function CollateralBalance({ market, token, isLoading, isSuccess, amount }) {

    const { isConnected } = useCurrentAccount()
    
    return isConnected 
        ? <CollateralAmount {...{ isLoading, isSuccess, amount }} /> 
        : <NoCollateralBalance />
}

const CollateralAmount = ({ isLoading, isSuccess, amount }) => (
    <>
        { isLoading ? (
            <div className="px-3 text-center">
                <div className="fw-medium mb-1">Your balance</div> 
                <div className="text-body-secondary"><div className="placeholder bg-secondary-subtle col-5"></div></div>
                <div className={`${css['collateral-balance']} text-body-tertiary`}><div className="placeholder placeholder-sm bg-secondary-subtle col-5"></div></div>
            </div>
        ) : isSuccess ? (
            <div className="px-3 text-center">
                <div className="fw-medium mb-1">Your balance</div> 
                <div className="text-body-secondary"><Amount value={amount} config={{ dp: 2, trimZeros: false}} /></div>
                <div className={`${css['collateral-balance']} text-body-tertiary`}>{NoData}</div>
            </div>
        ) : (
            <NoCollateralBalance />
        )}
    </>
)

const NoCollateralBalance = () => (
    <div className="px-3 text-center">
        <div className="fw-medium mb-1">Your balance</div> 
        <div className="text-body-secondary">{NoData}</div>
        <div className={`${css['collateral-balance']} text-body-tertiary`}>{NoData}</div>
    </div>
)

const mapStateToProps = (state: RootState, { market, token }) => {
    const { isLoading, isSuccess, data: positions } = state.collateralPositions
    const comet = cometProxy(market) 
    const amount = positions?.[comet][token.address].balance
    return { isLoading, isSuccess, amount }
}
export default connect(mapStateToProps)(CollateralBalance)


