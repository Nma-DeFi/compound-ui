import { connect } from "react-redux"
import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { RootState } from "../redux/types"
import { baseTokePriceFeed, cometProxy } from "../selectors/market-selector"
import Amount from "./Amount"
import { NoData } from "./Layout"
import PriceFromFeed from "./PriceFromFeed"
import { PriceFeed } from "../types"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { useEffect, useState } from "react"
import { getPriceFeedKind } from "../utils/markets"
import PlaceHolder, { PlaceHolderSize } from "./PlaceHolder"

export function SupplyBalance({ market, isIdle, isLoading, isSuccess, supplyBalance }) {

    const { isConnected } = useCurrentAccount()
    
    return isConnected 
        ? <SupplyBalanceAmount {...{ market, isIdle, isLoading, isSuccess, supplyBalance }} /> 
        : <NoSupplyBalance />
}

export function SupplyBalanceAmount({ market, isIdle, isLoading, isSuccess, supplyBalance }) { 

    const [ priceFeed, setPriceFeed ] = useState<PriceFeed>()
    const { currentChainId: chainId } = useCurrentChain()

    useEffect(() => {
        if (market) {
            const address = baseTokePriceFeed(market)
            const kind = getPriceFeedKind(market, chainId)
            setPriceFeed({address, kind})
        } else {
            setPriceFeed(null)
        }
    }, [chainId, market])

    return (
        <>
            { isIdle || isLoading ? (
                <>
                    <div className="mb-1"><PlaceHolder size={PlaceHolderSize.DEFAULT} col={5} /></div>
                    <PlaceHolder col={4} />
                </>
            ) : isSuccess ? (
                <>
                    <div className="mb-1"><Amount value={supplyBalance} /></div>
                    <small className="text-body-secondary">
                        <PriceFromFeed comet={cometProxy(market)} priceFeed={priceFeed} amount={supplyBalance} placeHolderCfg={{ col: 4 }} />
                    </small>
                </>
            ) : (
                <NoSupplyBalance />
            )}
        </>
    )
}

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


