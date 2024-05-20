import { usePublicClient } from "wagmi"
import { useCurrentChain } from "../hooks/useCurrentChain"
import { useLiquidationRisk } from "../hooks/useLiquidationRisk"
import NoData from "./NoData"
import PlaceHolder, { PlaceHolderSize } from "./PlaceHolder"

const DEFAULT_MIN_RISK_LABEL = 25

export function LiquidationRiskAsync({ asyncRisk }) {

    const { isLoading, isSuccess, data } = asyncRisk

    function formattedRisk() {
        const value = Number(data)
        if (isNaN(value)) return <NoData />
        const risk = Math.min(100, value)
        return <>{ risk.toFixed() }<small>%</small></>
    }
    
    return (
        <>
            { isLoading ? (
                <PlaceHolder size={PlaceHolderSize.NORMAL} col={2} />
            ) : isSuccess ? (
                <>{ formattedRisk() }</>
            ) : (
                <NoData />
            )}
        </>    
    )
}

export default function LiquidationRisk({ market, css, style = undefined, minRiskLabel = DEFAULT_MIN_RISK_LABEL }) {

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })
    const { isSuccess, data: risk } = useLiquidationRisk({ chainId, publicClient, market }) 

    return isSuccess && <LiquidationRiskProgress {...{ risk, css, style, minRiskLabel }} />
}

export function LiquidationRiskProgress({ risk, style, css = '', minRiskLabel = DEFAULT_MIN_RISK_LABEL }) {

    function riskLevel() {
        if (risk < 50) {
            return 'success'
        } else if (risk < 80) {
            return 'warning'
        } else {
            return 'danger'
        }
    }

    function riskPercent() {
        return `${risk?.toFixed()}%`
    }

    function riskLabel() {
        return (risk >= minRiskLabel) ? riskPercent() : ''
    }

    return (
        <div className={`progress ${css}`}
            role="progressbar" 
            aria-label="Risk" 
            aria-valuenow={risk} 
            aria-valuemin={0} 
            aria-valuemax={100} 
            style={style}  
            title={`Liquidation risk : ${riskPercent()}`}>
                <div className={`progress-bar overflow-visible text-bg-${riskLevel()}`} 
                    style={{ width: riskPercent()}}>
                { riskLabel() }
                </div>
        </div>
    )
}