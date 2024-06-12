import { useEffect, useState } from "react"
import { useBorrowPositions } from "../../../hooks/useBorrowPositions"
import { bna2 } from "../../Amount"
import Apr from "../../Apr"
import PriceFromFeed from "../../PriceFromFeed"
import TokenIcon from "../../TokenIcon"
import LiquidationRisk from "../../LiquidationRisk"
import { useCurrentChain } from "../../../hooks/useCurrentChain"
import { ActionInfo, Market } from "../../../types"
import { useBootstrap } from "../../../hooks/useBootstrap"
import RepayErc20Token, { REPAY_ERC20_TOKEN_MODAL } from "./RepayErc20Token"
import { BorrowBalance, BorrowPositionsState } from "../../../redux/slices/positions/borrowPositions"
import * as MarketSelector from "../../../selectors/market-selector"
import * as MarketUtils from "../../../utils/markets"
import ActionResult from "../../action-result/ActionResult"
import RepayNativeCurrency, { REPAY_NATIVE_CURRENCY } from "./RepayNativeCurrency"
import { Zero } from "../../../utils/bn"
import { chainIcon, chainName, getTokenOrNativeCurrency } from "../../../utils/chains"
import css from '../../../styles/components/borrow/BorrowPositions.module.scss'

export const REPAY_RESULT_TOAST = 'repay-result-toast'

export default function BorrowPositions({ asyncBorrowPositions } : { asyncBorrowPositions: BorrowPositionsState }) {

    const { currentChainId: chainId } = useCurrentChain()

    const [borrowBalances, setBorrowBalances] = useState<Array<BorrowBalance>>([])
    const [ market, setMarket ] = useState<Market>()
    const [ repayResult, setRepayResult ] = useState<ActionInfo>()

    const { openModal } = useBootstrap()

    const { isSuccess: isBorrowPositions, data: borrowPositions } = asyncBorrowPositions

    const comet = MarketSelector.cometProxy(market)
    const baseToken = MarketUtils.getBaseTokenOrNativeCurrency(market, chainId)

    const priceFeed = {
        address: MarketSelector.baseTokePriceFeed(market),
        kind: MarketUtils.getPriceFeedKind(market, chainId)
    }

    const token = {...baseToken, priceFeed }

    useEffect(() => {
        if (isBorrowPositions) {
            const borrowBalances = Object.values(borrowPositions).filter(p => p.borrowBalance.gt(Zero))
            setBorrowBalances(borrowBalances)
        }
    }, [isBorrowPositions, borrowPositions])

    function handleRepay(market: Market) {
        setMarket(market)
        if (MarketUtils.isNativeCurrencyMarket(market, chainId)) {
            openModal(REPAY_NATIVE_CURRENCY)
        } else {
            openModal(REPAY_ERC20_TOKEN_MODAL)
        }
    }

    function isShown() {
        if (!isBorrowPositions) return false
        const activePositions = Object.values(borrowPositions).filter(p => p.borrowBalance.gt(Zero))
        return activePositions.length > 0
    }

    return <>
        { isShown() &&  (
            <div className="bg-body p-3 rounded border shadow pb-4" style={{ marginBottom: '2rem' }}>     
                <h4 className={css['title']}>Your { borrowBalances.length > 1 ? 'borrowings' : 'borrowing' }</h4>
                <div className={`${css['chain']} d-flex align-items-center`}>
                    <div className={`${css['chain-label']} fw-semibold`}>Chain</div>
                    <img className={css['network-icon']} src={chainIcon(chainId)} alt={chainName(chainId)} />
                    {chainName(chainId)}
                </div>
                { borrowBalances.map((borrowPosition, index) => 
                    <div key={index}>
                        <div style={{ padding: '0.6rem 0'}}>       
                            <table className="table table-borderless align-middle mb-0">
                                <tbody>
                                <tr>
                                    <td className="w-50" style={{ padding: '0.5rem 0 1rem 0' }}>
                                        <div className="d-flex justify-content-start">
                                            <TokenIcon symbol={getTokenOrNativeCurrency(chainId, borrowPosition.baseToken).symbol} width={35} />
                                            <div className="ps-2">
                                                <div>{ bna2(borrowPosition.borrowBalance) } </div>
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
                                        <div>Borrow APR</div> 
                                        <div className="text-body-secondary"><Apr value={ borrowPosition.borrowApr } /></div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        { index + 1 < borrowBalances.length &&
                            <hr className="mx-2 my-4 text-body-tertiary" />
                        }
                    </div>
                )}
            </div>
        ) }
        <RepayErc20Token comet={comet} token={token} onRepay={setRepayResult} />
        <RepayNativeCurrency comet={comet} token={token} onRepay={setRepayResult} />
        <ActionResult {...{id: REPAY_RESULT_TOAST, ...repayResult}} />
    </>
}