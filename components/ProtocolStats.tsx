import { useEffect, useState } from "react"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { useProtocolStats } from "../hooks/useProtocolStats"
import { collateralBalanceUsd, totalBorrowUsd, totalSupplyUsd } from "../selectors/protocol-selector"
import { bnf } from "../utils/bn"
import { NoData } from "./Layout"

export default function ProtocolStats() {

    const [ totalCollateral, setTotalCollateral ] = useState<string>()
    const [ totalFarming, setTotalFarming ] = useState<string>()
    const [ totalBorrowing, setTotalBorrowing ] = useState<string>()

    const { currentChainId: chainId } = useCurrentChain()
    const { isLoading, isSuccess, data } = useProtocolStats({ chainId })

    useEffect(() => {
        if (isSuccess) {
            const totalFarming = totalSupplyUsd(data)
            const totalBorrowing = totalBorrowUsd(data)
            const totalCollateral = collateralBalanceUsd(data)
            setTotalFarming(bnf(totalFarming))
            setTotalBorrowing(bnf(totalBorrowing))
            setTotalCollateral(bnf(totalCollateral))
        }
    }, [chainId, isSuccess])

    return (
        <>
            <Stat {...{ isLoading, isSuccess, name: 'Total collateral', value: totalCollateral }}/>
            <Stat {...{ isLoading, isSuccess, name: 'Total borrowing', value: totalBorrowing }}/>
            <Stat {...{ isLoading, isSuccess, name: 'Total farming', value: totalFarming }}/>
        </>
    )
}

function Stat({ isLoading, isSuccess, name, value}) {
    return (
        <div className="placeholder-glow px-5">
            <div className="fw-semibold mb-1">{name}</div> 
            { isLoading ? (
                <div className="placeholder bg-secondary-subtle col-12"></div>
            ) : isSuccess ? (
                <div className="text-body-tertiary">${value}</div>
            ) : (
                <div className="text-body-tertiary">{NoData}</div>
            )}
        </div>
    )
}