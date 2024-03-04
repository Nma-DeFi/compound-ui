import { connect } from "react-redux"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { RootState } from "../redux/types"
import { cometProxy } from "../selectors/market-selector"
import Amount from "./Amount"
import { NoData } from "./Layout"
import css from '../styles/components/CollateralBalance.module.scss';
import PriceFromFeed from "./PriceFromFeed"
import { useEffect, useState } from "react"
import { PriceFeed } from "../types"
import { getPriceFeedKind } from "../utils/markets"
import { useCurrentChain } from "../hooks/useCurrentChain"
import PlaceHolder, { PlaceHolderSize } from "./PlaceHolder"


export function CollateralBalance({ market, collateral, isLoading, isSuccess, amount }) {

    const { isConnected } = useCurrentAccount()
    
    return isConnected 
        ? <CollateralAmount {...{ market, collateral, isLoading, isSuccess, amount }} /> 
        : <NoCollateralBalance />
}

function CollateralAmount({ market, collateral, isLoading, isSuccess, amount }) { 

    const [ priceFeed, setPriceFeed ] = useState<PriceFeed>()
    const { currentChainId: chainId } = useCurrentChain()

    useEffect(() => {
        if (market && collateral) {
            const address = collateral.priceFeed
            const kind = getPriceFeedKind(market, chainId)
            setPriceFeed({address, kind})
        } else {
            setPriceFeed(null)
        }
    }, [chainId, market, collateral])

    return (
        <>
            { isLoading ? (
                <CollateralBalanceLayout>
                    <PlaceHolder size={PlaceHolderSize.DEFAULT} col={5} />
                    <div className={css['collateral-balance']}><PlaceHolder col={4} /></div>
                </CollateralBalanceLayout>
            ) : isSuccess ? (
                <CollateralBalanceLayout>
                    <div className="text-body-secondary"><Amount value={amount} /></div>
                    <div className={`${css['collateral-balance']} text-body-tertiary`}>
                        <PriceFromFeed comet={cometProxy(market)} priceFeed={priceFeed} amount={amount} placeHolderCfg={{ col: 4 }} />
                    </div>
                </CollateralBalanceLayout>
            ) : (
                <NoCollateralBalance />
            )}
        </>
    )
}

const NoCollateralBalance = () => (
    <CollateralBalanceLayout>
        <div className="text-body-secondary">{NoData}</div>
        <div className={`${css['collateral-balance']} text-body-tertiary`}>{NoData}</div>
    </CollateralBalanceLayout>
)

const CollateralBalanceLayout = ({ children}) => (
    <div className="px-3 text-center">
        <div className="fw-medium mb-1">Your balance</div> 
        <>{ children }</>
    </div>
)

const mapStateToProps = (state: RootState, { market, collateral }) => {
    const { isLoading, isSuccess, data: positions } = state.collateralPositions
    const comet = cometProxy(market) 
    const amount = positions?.[comet][collateral.token.address].balance
    return { isLoading, isSuccess, amount }
}
export default connect(mapStateToProps)(CollateralBalance)


