import NoData from "../../components/NoData"
import css from '../../styles/pages/Claim.module.scss'
import { useEffect, useState } from "react"
import TokenIcon from "../../components/TokenIcon"
import { getBaseTokenOrNativeCurrency } from "../../utils/markets"
import { GrowSpinners } from "../../components/Spinner"
import { useRewardsOwed } from "../../hooks/useRewardsOwed"
import Amount from "../../components/Amount"
import BigNumber from "bignumber.js"
import PriceFromSymbol from "../../components/PriceFromSymbol"
import { COMP_TOKEN } from "../../services/rewards-service"
import { useCurrentAccount } from "../../hooks/useCurrentAccount"
import { useBootstrap } from "../../hooks/useBootstrap"
import ClaimOneMarket, { CLAIM_MODAL } from "../../components/pages/claim/ClaimOneMarket"
import ActionResult from "../../components/action-result/ActionResult"
import { ActionInfo } from "../../types"
import ClaimAllMarkets, { CLAIM_ALL_MODAL } from "../../components/pages/claim/ClaimAllMarkets"
import { getTotalRewards, getTotalRewardsByChain } from "../../redux/helpers/rewards"
import { Zero } from "../../utils/bn"
import PlaceHolder from "../../components/PlaceHolder"
import WarningMessage from "../../components/WarningMessage"
import { orderedChainList } from "../../utils/chains"
import { useMarkets } from "../../hooks/useMarkets"

export default function Claim() {

    const [ claimInfo, setClaimInfo ] = useState(null)
    const [ claimResult, setClaimResult ] = useState<ActionInfo>()

    const { isConnected } = useCurrentAccount()
    const { openModal } = useBootstrap()

    const chains = orderedChainList()

    const rewardsOwed = useRewardsOwed()

    const { isSuccess: isRewards, data: rewards } = rewardsOwed

    function handleClaim(chain, market) {
        setClaimInfo({ chain, market, onClaim: setClaimResult })
        openModal(CLAIM_MODAL)
    }
        
    function handleClaimAll(chain) {
        setClaimInfo({ chain })
        openModal(CLAIM_ALL_MODAL)
    }

    function totalRewards() {
        if (!isRewards) return undefined
        return getTotalRewards({ rewardsOwed: rewards })
    }

    function totalRewardsBychain(chainId) {
        if (!isRewards) return undefined
        return getTotalRewardsByChain({ rewardsOwed: rewards, chainId })
    }

    function nbMarketsWithRewards(chainId) {
        if (!(isRewards && rewards[chainId])) return 0
        return Object.values(rewards[chainId]).filter(r => r?.balance.gt(0)).length
    }

    return ( 
        <>
            <div className="col-12 col-lg-7 col-xxl-6 px-0 px-xl-5">
                <div className="bg-body px-3 px-md-4 pb-4 pt-3 rounded border shadow mb-4">
                    <div className="d-flex justify-content-between mb-3">
                        <h2 className="m-0">Claim</h2>
                        <div className="small text-center">
                            <div className="fw-semibold mb-1">Total rewards</div> 
                            <div style={{ fontSize: '95%' }}>
                                { !isConnected ? ( 
                                        <NoData /> 
                                    ) : (
                                        <>
                                            { !isRewards ? ( 
                                                <PlaceHolder col={8} /> 
                                            ) : (
                                                <div className="d-flex justify-content-center">
                                                    <TokenIcon symbol={ COMP_TOKEN.symbol } css="me-2" size="18" />
                                                    { totalRewards().gt(0) ? (
                                                            <>
                                                                <Amount value={totalRewards()} /> 
                                                                <div className="text-body-secondary ps-2">
                                                                    <PriceFromSymbol symbol={COMP_TOKEN.symbol} amount={totalRewards()} placeHolderCfg={{ col: 6 }} />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <><Amount value={totalRewards()} /> <span className="text-body-secondary ps-1">COMP</span></>
                                                        )
                                                    }
                                                </div>
                                            )}
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div id={ css['claim-accordion'] } className="accordion">
                    { chains.map(chain => 
                        <div className="accordion-item" key={chain.id}>
                            <h2 className="accordion-header">
                                <button className={`accordion-button collapsed ${css['accordion-button-custom']}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${chain.id}`} aria-expanded="false" aria-controls={`collapse${chain.id}`}>
                                    <div className="d-flex align-items-center me-auto">
                                        <img src={chain.icon} style={{ width: '1.8rem' }} alt="Ethereum" />
                                        <div className="fs-5 ms-3">{chain.shortName}</div>
                                    </div>
                                    { isConnected && totalRewardsBychain(chain.id)?.isGreaterThan(Zero) &&
                                        <div className="d-flex align-items-center small rounded-5 text-bg-light p-2 me-3">
                                            <TokenIcon symbol="COMP" css={`${css['comp-icon']} me-2 d-none d-sm-block`} /> Rewards
                                        </div>
                                    }
                                </button>
                            </h2>
                            <div id={`collapse${chain.id}`} className="accordion-collapse collapse">
                                <div className="accordion-body px-2 px-md-3">
                                    <div className="table-responsive mb-1">
                                    <table className="table table-striped table-borderless align-middle">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="fw-semibold" style={{ width: '40%' }}>Market</th>
                                                <th scope="col" className="fw-semibold text-center" style={{ width: '40%' }}>Claimable</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <MarketsList chain={chain} rewardsOwed={rewardsOwed} onClaimMarket={handleClaim} />
                                            { isConnected && nbMarketsWithRewards(chain.id) > 1  &&
                                                <tr>
                                                    <td className="text-center" colSpan={3} style={{ cursor: 'pointer', padding: '0.7rem 0' }}>
                                                        <button type="button" className="btn btn-primary text-white" onClick={() => handleClaimAll(chain)}>Claim all markets</button>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
                <ClaimOneMarket { ...claimInfo } />
                <ClaimAllMarkets { ...claimInfo } />
                <ActionResult { ...claimResult } />
            </div>
        </>
    )
}

function MarketsList({ chain, rewardsOwed, onClaimMarket }) {
    const { isConnected } = useCurrentAccount()

    const markets = useMarkets({ chainId: chain.id })

    const { isSuccess: isRewards, data: rewards } = rewardsOwed

    function isRewardsByMarket(chainId, marketId) {
        return isRewards && rewards[chainId] && rewards[chainId][marketId]    
    }

    return ( 
        <>
            { markets.isError && 
                <tr>
                    <td colSpan={3}>
                        <WarningMessage>Data currently unavailable</WarningMessage>
                    </td>
                </tr> 
            }
            { markets.isLoading && 
                <tr>
                    <td className="text-center" colSpan={3}>
                        <GrowSpinners nb={3} css="text-center" /> 
                    </td>
                </tr> 
            }
            { markets.isSuccess && markets.data.map(market =>
                <tr key={market.id}>
                    <td>
                        <TokenIcon symbol={ getBaseTokenOrNativeCurrency(market, chain.id).symbol } css={`d-none d-sm-inline me-2 ${css['market-icon']}`} />
                        { getBaseTokenOrNativeCurrency(market, chain.id).symbol } <span className="text-body-secondary">Market</span>
                    </td>
                    <RewardsBalance chain={chain.id} market={market.id} rewardsOwed={rewardsOwed} />
                    <td className="text-end">
                    { isConnected && isRewardsByMarket(chain.id, market.id) ?
                        <button type="button" className="btn btn-primary text-white" onClick={() => onClaimMarket(chain, market)}>Claim</button>
                    :  
                        <button type="button" className="btn btn-primary text-white" disabled>Claim</button>
                    }
                    </td>
                </tr>
            )}
        </>                                               
    )
}

function RewardsBalance({ chain, market, rewardsOwed }) {

    const [ balance, setBalance ] = useState<BigNumber>()

    const { isConnected } = useCurrentAccount()

    const { isSuccess: isRewards, data: rewards} = rewardsOwed
        
    useEffect(() => {
        if (isRewards) {
            let balance = null
            if (rewards[chain] && rewards[chain][market]) {
                balance = rewards[chain][market].balance
            } 
            setBalance(balance)
        }
    }, [rewards])

    return isConnected && !!balance ? (
        <td className="text-center">
            <div className="d-flex justify-content-center align-items-center mb-1">
                <TokenIcon symbol={COMP_TOKEN.symbol} css={css['comp-icon']} />
                <Amount value={balance} />
            </div>
            <div className="small text-body-secondary">
                <PriceFromSymbol symbol={COMP_TOKEN.symbol} amount={balance} placeHolderCfg={{ col: 2 }} />
            </div>
        </td>   
    ) : (
        <td className="text-center">
            <div className="d-flex justify-content-center align-items-center mb-1"><NoData /></div>
            <div className="small text-body-secondary"><NoData /></div>
        </td>   
    )
}
  