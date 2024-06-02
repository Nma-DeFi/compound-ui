import { useCurrentAccount } from "../hooks/useCurrentAccount"
import { cometProxy } from "../selectors/market-selector"
import { bna2 } from "./Amount"
import { NoData } from "../utils/page"
import css from '../styles/components/CollateralBalance.module.scss'
import PriceFromFeed from "./PriceFromFeed"
import { useEffect, useState } from "react"
import { PriceFeed } from "../types"
import { getPriceFeedKind } from "../utils/markets"
import { useCurrentChain } from "../hooks/useCurrentChain"
import PlaceHolder, { PlaceHolderSize } from "./PlaceHolder"
import { useCollateralPositions } from "../hooks/useCollateralPositions"
import { AsyncBigNumber, IdleData, LoadingData, SuccessData } from "../utils/async"

export default function CollateralBalance({ market, collateral }) {
    const [asyncCollateralBalance, setAsyncCollateralBalance] = useState<AsyncBigNumber>(IdleData)

    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()
    const asyncCollateralPositions = useCollateralPositions()

    useEffect(() => {
        setAsyncCollateralBalance(LoadingData)
        if (market && asyncCollateralPositions.isSuccess) {
            const comet = cometProxy(market)
            const token = collateral.token.address
            const collateralBalance = asyncCollateralPositions.data[comet]?.[token]?.balance
            if (collateralBalance) {
                const successBalance = SuccessData(collateralBalance)
                setAsyncCollateralBalance(successBalance)
            }
        }
    }, [chainId, market, asyncCollateralPositions])
        
    return isConnected 
        ? <CollateralAmount {...{ market, collateral, asyncCollateralBalance }} /> 
        : <NoCollateralBalance />
}

function CollateralAmount({ market, collateral, asyncCollateralBalance }) { 
    const { isLoading, isSuccess, data: amount } = asyncCollateralBalance

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
                    <PlaceHolder size={PlaceHolderSize.NORMAL} col={5} />
                    <div className={css['collateral-balance']}><PlaceHolder col={4} /></div>
                </CollateralBalanceLayout>
            ) : isSuccess ? (
                <CollateralBalanceLayout>
                    <div className="text-body-secondary">{ bna2(amount) }</div>
                    <div className={`${css['collateral-balance']} text-body-tertiary`}>
                        <PriceFromFeed priceFeed={priceFeed} amount={amount} placeHolderCfg={{ col: 4 }} />
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


