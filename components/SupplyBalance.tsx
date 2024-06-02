import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { baseTokePriceFeed, cometProxy } from "../selectors/market-selector"
import { bna2 } from "./Amount"
import { NoData } from "../utils/page"
import PriceFromFeed from "./PriceFromFeed"
import { PriceFeed } from "../types"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { useEffect, useState } from "react"
import { getPriceFeedKind } from "../utils/markets"
import PlaceHolder, { PlaceHolderSize } from "./PlaceHolder"
import { useSupplyPositions } from "../hooks/useSupplyPositions"
import { AsyncBigNumber, IdleData, LoadingData, SuccessData } from "../utils/async"

export default function SupplyBalance({ market }) {
    const [asyncSupplyBalance, setAsyncSupplyBalance] = useState<AsyncBigNumber>(IdleData)

    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()
    const asyncSupplyPositions = useSupplyPositions()

    
    useEffect(() => {
        setAsyncSupplyBalance(LoadingData)
        if (market && asyncSupplyPositions.isSuccess) {
            const comet = cometProxy(market)
            const supplyBalance = asyncSupplyPositions.data[comet]?.supplyBalance
            if (supplyBalance) {
                const successBalance = SuccessData(supplyBalance)
                setAsyncSupplyBalance(successBalance)
            }
        }
    }, [chainId, market, asyncSupplyPositions])

    return isConnected 
        ? <SupplyBalanceAmount {...{ market, asyncSupplyBalance }} /> 
        : <NoSupplyBalance />
}


export function SupplyBalanceAmount({ market, asyncSupplyBalance }) { 
    const { isLoading, isSuccess, data: supplyBalance } = asyncSupplyBalance

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
            { isLoading ? (
                <>
                    <div className="mb-1">
                        <PlaceHolder size={PlaceHolderSize.NORMAL} col={5} />
                    </div>
                    <PlaceHolder col={4} />
                </>
            ) : isSuccess ? (
                <>
                    <div className="mb-1">{bna2(supplyBalance)}</div>
                    <small className="text-body-secondary">
                        <PriceFromFeed priceFeed={priceFeed} amount={supplyBalance} placeHolderCfg={{ col: 4 }} />
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



