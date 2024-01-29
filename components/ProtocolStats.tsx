import { useEffect, useState } from "react"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { useProtocolStats } from "../hooks/useProtocolStats"
import { collateralBalanceUsd, totalBorrowUsd, totalSupplyUsd } from "../selectors/protocol-selector"
import { bnf } from "../utils/bn"

export default function ProtocolStats() {

    const [ totalCollateral, setTotalCollateral ] = useState<string>()
    const [ totalFarming, setTotalFarming ] = useState<string>()
    const [ totalBorrowing, setTotalBorrowing ] = useState<string>()

    const { currentChainId: chainId } = useCurrentChain()
    const { isSuccess, data } = useProtocolStats({ chainId })

    useEffect(() => {
        if (isSuccess) {
            const totalFarming = totalSupplyUsd(data)
            const totalBorrowing = totalBorrowUsd(data)
            const totalCollateral = collateralBalanceUsd(data)
            setTotalFarming(bnf(totalFarming))
            setTotalBorrowing(bnf(totalBorrowing))
            setTotalCollateral(bnf(totalCollateral))
        }
    }, [isSuccess, data])

    return (
        <>
            <div className="px-5">
                <div className="fw-semibold">Total collateral</div> 
                {isSuccess ? (
                    <div className="text-body-tertiary">${totalCollateral}</div>
                ) : (
                    <div className="text-body-tertiary">—</div>
                )}
            </div>
            <div className="px-5">
                <div className="fw-semibold">Total borrowing</div> 
                {isSuccess ? (
                    <div className="text-body-tertiary">${totalBorrowing}</div>
                ) : (
                    <div className="text-body-tertiary">—</div>
                )}
            </div>
            <div className="px-5">
                <div className="fw-semibold">Total farming</div> 
                {isSuccess ? (
                    <div className="text-body-tertiary">${totalFarming}</div>
                ) : (
                    <div className="text-body-tertiary">—</div>
                )}

            </div>
        </>
    )
}