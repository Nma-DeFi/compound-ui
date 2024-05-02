import { useEffect, useState } from "react"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { useProtocolStats } from "../hooks/useProtocolStats"
import { collateralBalanceUsd, totalBorrowUsd, totalSupplyUsd } from "../selectors/protocol-selector"
import { bnp } from "./Price"
import NoData from "./NoData"
import PlaceHolder, { PlaceHolderSize } from "./PlaceHolder"

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
            <Stat {...{ isLoading, isSuccess, name: 'Total earning', value: totalEarning }}/>
            <Stat {...{ isLoading, isSuccess, name: 'Total borrowing', value: totalBorrowing }}/>
            <Stat {...{ isLoading, isSuccess, name: 'Total collateral', value: totalCollateral }}/>
        </>
    )
}

function Stat({ isLoading, isSuccess, name, value}) {
    return (
        <div className="placeholder-glow px-5">
            { isLoading ? (
                <div className="pb-1"><PlaceHolder col={12} size={PlaceHolderSize.LARGE} /></div>
            ) : isSuccess ? (
                <div className="fw-medium" style={{ fontSize: '1.2rem' }}>${value}</div>
            ) : (
                <NoData/>
            )}
            <div className="text-body-secondary mt-1">{name}</div> 
        </div>
    )
}