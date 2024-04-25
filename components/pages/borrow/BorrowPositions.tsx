import { useEffect, useState } from "react"
import { useBorrowPositions } from "../../../hooks/useBorrowPositions"
import Amount from "../../Amount"
import Apr from "../../Apr"
import PriceFromFeed from "../../PriceFromFeed"
import TokenIcon from "../../TokenIcon"
import LiquidationRisk from "../../LiquidationRisk"
import Spinner from "../../Spinner"
import { useCurrentChain } from "../../../hooks/useCurrentChain"
import { ActionInfo, Market } from "../../../types"
import { useBootstrap } from "../../../hooks/useBootstrap"
import RepayErc20Token, { REPAY_ERC20_TOKEN_MODAL } from "./RepayErc20Token"
import { BorrowBalance } from "../../../redux/slices/positions/borrowPositions"
import * as MarketSelector from "../../../selectors/market-selector"
import * as MarketUtils from "../../../utils/markets"
import ActionResult from "../../action-result/ActionResult"
import RepayNativeCurrency, { REPAY_NATIVE_CURRENCY } from "./RepayNativeCurrency"
import { Zero } from "../../../utils/bn"
import { getTokenOrNativeCurrency } from "../../../utils/chains"

export const REPAY_RESULT_TOAST = 'repay-result-toast'

export default function BorrowPositions() {

    const { currentChainId: chainId } = useCurrentChain()

    const [borrowPositions, setBorrowPositions] = useState<Array<BorrowBalance>>([])
    const [ market, setMarket ] = useState<Market>()
    const [ repayResult, setRepayResult ] = useState<ActionInfo>()

    const { isLoading, isSuccess, data } = useBorrowPositions()

    const { openModal } = useBootstrap()

    const comet = MarketSelector.cometProxy(market)
    const baseToken = MarketSelector.baseToken(market)

    const priceFeed = {
        address: MarketSelector.baseTokePriceFeed(market),
        kind: MarketUtils.getPriceFeedKind(market, chainId)
    }

    const token = {...baseToken, priceFeed }

    useEffect(() => {
        if (isSuccess) {
            const borrowPositions = Object.values(data).filter(p => p.borrowBalance.gt(Zero))
            setBorrowPositions(borrowPositions)
        }
    }, [isSuccess, data])

    function handleRepay(market: Market) {
        setMarket(market)
        if (MarketUtils.isNativeCurrencyMarket(market, chainId)) {
            openModal(REPAY_NATIVE_CURRENCY)
        } else {
            openModal(REPAY_ERC20_TOKEN_MODAL)
        }
    }

    function isShown() {
        if (!isSuccess) return false
        const activePositions = Object.values(data).filter(p => p.borrowBalance.gt(Zero))
        return activePositions.length > 0
    }

    return <>
        { isShown() && (
            <div className="bg-body p-3 rounded border shadow pb-4" style={{ marginBottom: '2rem' }}>     
                <h4 style={{ marginBottom: '1.25rem' }}>Your { borrowPositions.length > 1 ? 'borrowings' : 'borrowing' }</h4>
                { isLoading &&
                    <div className="py-4">
                        <Spinner css="d-flex mx-auto text-secondary text-opacity-25" />
                    </div>
                }
                { isSuccess && borrowPositions.map((borrowPosition, index) => 
                    <div key={index}>
                        <div style={{ padding: '0.6rem 0'}}>       
                            <table className="table table-borderless align-middle mb-0">
                                <tbody>
                                <tr>
                                    <td className="w-50" style={{ padding: '0.5rem 0 1rem 0' }}>
                                        <div className="d-flex justify-content-start">
                                            <TokenIcon symbol={getTokenOrNativeCurrency(chainId, borrowPosition.baseToken).symbol} width={35} />
                                            <div className="ps-2">
                                                <div><Amount value={borrowPosition.borrowBalance} /></div>
                                                <div className="small text-body-secondary">
                                                    <PriceFromFeed priceFeed={borrowPosition.priceFeed} amount={borrowPosition.borrowBalance} placeHolderCfg={{ col: 12 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center" style={{ padding: '0.5rem 0 1rem 0' }}>
                                        <div className="small" style={{ paddingBottom: '0.35rem' }}>Liquidation risk</div> 
                                        <LiquidationRisk market={ borrowPosition.market } css="mx-4" minRiskLabel={100} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-0 py-2 w-50">                                
                                        <button type="button" className="btn btn-light border border-light-subtle" onClick={() => handleRepay(borrowPosition.market)} style={{ width: '90%'}}>
                                            <i className="bi bi-box-arrow-in-down me-1"></i> Repay
                                        </button>
                                    </td>
                                    <td className="px-0 py-2 text-center small">
                                        <div className="">Borrow APR</div> 
                                        <div className="text-body-secondary"><Apr value={ borrowPosition.borrowApr } /></div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        { index + 1 < borrowPositions.length &&
                            <hr className="mx-2 my-4 text-body-tertiary" />
                        }
                    </div>
                )}
                <RepayErc20Token comet={comet} token={token} onRepay={setRepayResult} />
                <RepayNativeCurrency comet={comet} token={token} onRepay={setRepayResult} />
            </div>
        ) }
        <ActionResult {...{id: REPAY_RESULT_TOAST, ...repayResult}} />
    </>
}