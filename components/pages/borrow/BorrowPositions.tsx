import { useEffect, useState } from "react"
import { useBorrowPositions } from "../../../hooks/useBorrowPositions"
import Amount from "../../Amount"
import Apr from "../../Apr"
import PriceFromFeed from "../../PriceFromFeed"
import TokenIcon from "../../TokenIcon"
import { BorrowBalance } from "../../../redux/slices/positions/borrowPositions"
import { Zero } from "../../../utils/bn"
import { useLiquidationRisk } from "../../../hooks/useLiquidationRisk"
import LiquidationRisk from "../../LiquidationRisk"
import Spinner, { GrowSpinners } from "../../Spinner"

export default function BorrowPositions() {

    const [borrowPositions, setBorrowPositions] = useState<Array<BorrowBalance>>([])

    const { isLoading, isSuccess, data } = useBorrowPositions()

    useEffect(() => {
        if (isSuccess) {
            const borrowPositions = Object.values(data)
            //const borrowPositions = Object.values(data).filter(p => p.borrowBalance.gt(Zero))
            setBorrowPositions(borrowPositions)
        }
    }, [isSuccess, data])

    return (
        <div className="bg-body p-3 rounded border shadow mb-4">     
        <h4 className="mb-4">Your { borrowPositions.length > 1 ? 'borrowings' : 'borrowing' }</h4>
        { isLoading &&
            <Spinner css="d-flex mx-auto mt-4 mb-3 text-body-tertiary" />
        }
        { isSuccess && borrowPositions.map((borrowPosition, index) => 
            <>       
            <table className="table table-borderless align-middle">
                <tbody>
                <tr>
                    <td className="w-50">
                        <div className="d-flex justify-content-start">
                            <TokenIcon symbol={borrowPosition.baseToken.symbol} width={35} />
                            <div className="ps-2">
                                <div><Amount value={borrowPosition.borrowBalance} /> <small className="text-body-secondary">{borrowPosition.baseToken.symbol}</small></div>
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
                        <button type="button" className="btn btn-light border border-light-subtle w-100"><i className="bi bi-box-arrow-in-down me-1"></i> Repay</button>
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
        </div>
    )
}