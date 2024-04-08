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
            const borrowPositions = Object.values(data)
            setBorrowPositions(borrowPositions)
        }
    }, [isSuccess, data])

    function handleRepay(market: Market) {
        setMarket(market)
        openModal(REPAY_ERC20_TOKEN_MODAL)
    }

    return (
        <div className="bg-body p-3 rounded border shadow pb-4">     
            <h4 className="mb-4">Your { borrowPositions.length > 1 ? 'borrowings' : 'borrowing' }</h4>
            { isLoading &&
                <Spinner css="d-flex mx-auto mt-4 mb-3 text-body-tertiary" />
            }
            { isSuccess && borrowPositions.map((borrowPosition, index) => 
                <>       
                    <table className="table table-borderless align-middle mb-0">
                        <tbody>
                        <tr>
                            <td className="w-50">
                                <div className="d-flex justify-content-start">
                                    <TokenIcon symbol={borrowPosition.baseToken.symbol} width={35} />
                                    <div className="ps-2">
                                        <div><Amount value={borrowPosition.borrowBalance} /> {/*<small className="text-body-secondary">{borrowPosition.baseToken.symbol}</small>*/}</div>
                                        <div className="small text-body-secondary">
                                            <PriceFromFeed priceFeed={borrowPosition.priceFeed} amount={borrowPosition.borrowBalance} placeHolderCfg={{ col: 8 }} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <div className="small">Liquidation risk</div> 
                                <LiquidationRisk market={ borrowPosition.market } css="mx-2" style={{ marginTop: '0.4rem' }} minRiskLabel={30} />
                            </td>
                        </tr>
                        <tr>
                            <td className="w-50">                                
                                <button type="button" className="btn btn-light border border-light-subtle w-100" onClick={ () => handleRepay(borrowPosition.market)}>
                                    <i className="bi bi-box-arrow-in-down me-1"></i> Repay
                                </button>
                            </td>
                            <td className="text-center">
                                <div className="small">Borrow APR</div> 
                                <div className="text-body-secondary"><Apr value={ borrowPosition.borrowApr } /></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    { index + 1 < borrowPositions.length &&
                        <hr className="mx-2 my-4 text-body-tertiary" />
                    }
                </>
            )}
            <RepayErc20Token comet={comet} token={token} onRepay={setRepayResult} />
            <ActionResult {...{id: REPAY_RESULT_TOAST, comet, ...repayResult}} />
        </div>
    )
}