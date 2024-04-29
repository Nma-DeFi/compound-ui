import { useEffect, useState } from "react"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { useProtocolStats } from "../hooks/useProtocolStats"
import { collateralBalanceUsd, totalBorrowUsd, totalSupplyUsd } from "../selectors/protocol-selector"
import { NoData } from "../utils/page"
import { bnp } from "./Price"

export default function ProtocolStats() {

    const [ totalCollateral, setTotalCollateral ] = useState<string>()
    const [ totalEarning, setTotalEarning ] = useState<string>()
    const [ totalBorrowing, setTotalBorrowing ] = useState<string>()

    const { currentChainId: chainId } = useCurrentChain()
    const { isLoading, isSuccess, data } = useProtocolStats({ chainId })

    useEffect(() => {
        if (isSuccess) {
            const totalEarning = totalSupplyUsd(data)
            const totalBorrowing = totalBorrowUsd(data)
            const totalCollateral = collateralBalanceUsd(data)
            setTotalEarning(bnp(totalEarning))
            setTotalBorrowing(bnp(totalBorrowing))
            setTotalCollateral(bnp(totalCollateral))
        }
    }, [chainId, isSuccess])

    return (
        <>
            <Stat {...{ isLoading, isSuccess, name: 'Total collateral', value: totalCollateral }}/>
            <Stat {...{ isLoading, isSuccess, name: 'Total borrowing', value: totalBorrowing }}/>
            <Stat {...{ isLoading, isSuccess, name: 'Total earning', value: totalEarning }}/>
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