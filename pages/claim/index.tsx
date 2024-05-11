import Head from "next/head"
import NoData from "../../components/NoData"
import css from '../../styles/pages/Claim.module.scss'
import { useEffect, useState } from "react"
import TokenIcon from "../../components/TokenIcon"
import { ChainDataService } from "../../services/chain-data-service"
import { getBaseTokenOrNativeCurrency } from "../../utils/markets"
import { GrowSpinners } from "../../components/Spinner"
import { RewardsService } from "../../services/rewards-service"
import { useCurrentAccount } from "../../hooks/useCurrentAccount"
import { usePublicClient } from "wagmi"
import { useCurrentChain } from "../../hooks/useCurrentChain"

export default function Claim() {

    const [ chainList, setChainList ] = useState([])

    const { address } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })
    
    useEffect(() => {
        ChainDataService.findAllChains().then(setChainList)
    }, [])

    useEffect(() => {
        if (address) {
            const rewardService = new RewardsService({ publicClient })
            rewardService.findAllRewards(address)
        }
    }, [address])

    return ( 
        <>
            <Head>
                <title>Claim</title>
            </Head>
            <div className="col-12 col-lg-7 col-xxl-6 px-0 px-xl-5">
                <div className="bg-body px-3 px-md-4 pb-4 pt-3 rounded border shadow mb-4">
                    <div className="d-flex justify-content-between mb-3">
                        <h2 className="m-0">Claim</h2>
                        <div className="small text-center">
                            <div className="fw-semibold mb-1">Total rewards</div> 
                            <div className="text-body-secondary"><NoData /></div>
                        </div>
                    </div>
                    { chainList.length === 0 && <GrowSpinners nb={6} css="text-center py-5" /> }
                    <div id={ css['claim-accordion'] } className="accordion">
                    { chainList.map(chain => 
                        <div className="accordion-item" key={chain.id}>
                            <h2 className="accordion-header">
                                <button className={`accordion-button collapsed ${css['accordion-button-custom']}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${chain.id}`} aria-expanded="false" aria-controls={`collapse${chain.id}`}>
                                    <div className="d-flex align-items-center me-auto">
                                        <img src={chain.icon} style={{ width: '1.8rem' }} alt="Ethereum" />
                                        <div className="fs-5 ms-3">{chain.shortName}</div>
                                    </div>
                                    <div className="d-flex align-items-center small rounded-5 text-bg-light p-2 me-3">
                                        <TokenIcon symbol="COMP" css={`${css['comp-icon']} me-2 d-none d-sm-block`} /> Rewards
                                    </div>
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
                                            {chain.markets.map(market =>
                                                <tr key={market.id}>
                                                    <td>
                                                        <TokenIcon symbol={ getBaseTokenOrNativeCurrency(market, chain.id).symbol } css={`d-none d-sm-inline me-2 ${css['market-icon']}`} />
                                                        { getBaseTokenOrNativeCurrency(market, chain.id).symbol } <span className="text-body-secondary">Market</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex justify-content-center align-items-center mb-1">
                                                            {/*<TokenIcon symbol="COMP" css={` me-2 ${css['claimable-comp-icon']}`} />*/}<div><NoData /></div>
                                                        </div>
                                                        <div className="small text-body-secondary"><NoData /></div>
                                                    </td>
                                                    <td className="text-end">
                                                        <button type="button" className="btn btn-primary text-white" disabled>Claim</button>
                                                    </td>
                                                </tr>
                                            )}
                                            { chain.markets.length > 1 &&
                                                <tr>
                                                    <td className="text-center py-2" colSpan={3} style={{ cursor: 'pointer' }}>
                                                        <button type="button" className="btn btn-primary text-white" disabled>Claim all markets</button>
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
            </div>
        </>
    )
}
  