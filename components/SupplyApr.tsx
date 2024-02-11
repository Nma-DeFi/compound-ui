import { useEffect, useState } from "react";
import { netSupplyAprScaled, rewardSupplyAprScaled, supplyAprScaled } from "../selectors/market-selector";
import { bnf } from "../utils/bn";
import { useBootstrap } from "../hooks/useBootstrap";
import css from '../styles/components/SupplyApr.module.scss';

export default function SupplyApr({ market }) {

    const [ apr, setApr] = useState<string>()
    const [ tooltipContent, setTooltipContent] = useState<string>()
    const { getOrCreateTooltip } = useBootstrap()

    useEffect(() => {
        if (market) { 
            const netApr = netSupplyAprScaled(market)
            const rewardApr = rewardSupplyAprScaled(market)
            const supplyApr = supplyAprScaled(market)
            const format = (apr: string) => `${bnf(apr)}<small>%</small>`
            setApr(netApr)
            setTooltipContent(
                `<div class="p-3">
                    <p><strong>Total APR</strong> : ${format(netApr)}</p>
                    <p>Supply APR : ${format(supplyApr)}</p>
                    <p class="mb-0">Reward APR : ${format(rewardApr)}</p>
                </div>`
            )
        }
    }, [market])

    useEffect(() => {
        if (tooltipContent && getOrCreateTooltip) {
            const id = tooltipId()
            const tooltip = document.getElementById(id)
            getOrCreateTooltip(tooltip)
        }
    }, [tooltipContent, getOrCreateTooltip])

    const tooltipId = () => `${market.id}-apr`

    return (
        <>
            {bnf(apr)}<small className="text-body-secondary">%</small>
            <a href="#" 
                id={tooltipId()}
                data-bs-toggle="tooltip" 
                data-bs-html="true" 
                data-bs-title={tooltipContent} 
                onClick={e => e.preventDefault()}>
                <i className={`bi bi-info-square text-body-secondary ms-2 d-none d-sm-inline ${css['tooltip-icon']}`}></i>
            </a>
        </>
    )
}