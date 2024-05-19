import { useEffect, useState } from 'react'
import { ModalEvent, useModalEvent } from '../../../hooks/useBootstrap'
import { useRewardsOwed } from '../../../hooks/useRewardsOwed'
import { REWARD_TOKEN } from '../../../services/rewards-service'
import css from '../../../styles/components/claim/ClaimOneMarket.module.scss'
import Amount from '../../Amount'
import TokenIcon from '../../TokenIcon'
import BigNumber from 'bignumber.js'
import { SmallSpinner } from '../../Spinner'
import PriceFromSymbol from '../../PriceFromSymbol'
import { chainIcon, chainName } from '../../../utils/chains'
import { getBaseTokenOrNativeCurrency } from '../../../utils/markets'

export const CLAIM_MODAL = 'claim-modal'

const enum Mode {
    Init,
    ClaimReady,
}

export default function ClaimOneMarket({ chain, market }) {

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>()

    const { isSuccess: isRewards, data: rewards } = useRewardsOwed()

    const modalEvent = useModalEvent(CLAIM_MODAL)

    useEffect(() => {
        if (mode === Mode.Init && isRewards) {
            if ((chain.id in rewards) && (market.id in rewards[chain.id])) {
                setAmount(rewards[chain.id][market.id].balance)
                setMode(Mode.ClaimReady)
            } 
        }
      }, [mode, rewards])

    useEffect(() => {
        switch (modalEvent) {
          case ModalEvent.Show:
            onOpen()
            break
          case ModalEvent.Hidden:
            onHide()
            break
        } 
    }, [modalEvent])

    function onOpen() {
        setMode(Mode.Init)
    }
    
    function onHide() {
        setMode(null)
        setAmount(null)
    }

    return (
        <div id={CLAIM_MODAL} className="modal" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className={`${css['title']} d-flex justify-content-between align-items-center`}>
                            <h3 className="m-0">Claim rewards</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td className={`${css['table-label']} table-light fw-semibold`}>Chain</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center">
                                            { mode > Mode.Init &&
                                                <>
                                                    <img className={`${css['network-icon']} d-inline me-2`} src={chainIcon(chain.id)} alt="networks" />
                                                    <div>{chainName(chain.id)}</div>
                                                </>
                                            }
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`${css['table-label']} table-light fw-semibold`}>Market</td>
                                    <td className="text-center">
                                    { mode > Mode.Init &&
                                        <>
                                            <TokenIcon symbol={ getBaseTokenOrNativeCurrency(market, chain.id).symbol } css={`${css['market-icon']} me-2`} />
                                            { getBaseTokenOrNativeCurrency(market, chain.id).symbol } <span className="text-body-secondary">Market</span>
                                        </>
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`${css['table-label']} table-light fw-semibold`}>Rewards</td>
                                    <td>
                                    { mode > Mode.Init &&
                                        <>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <TokenIcon symbol={ REWARD_TOKEN.symbol } css="me-2" width="20" />
                                                <Amount value={amount} /> 
                                                <span className="text-body-secondary ps-1">{ REWARD_TOKEN.symbol }</span>
                                                <small className="ps-3 text-body-secondary">(<PriceFromSymbol symbol={REWARD_TOKEN.symbol} amount={amount} placeHolderCfg={{ col: 2 }} />)</small>
                                            </div>
                                        </>
                                    }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={`${css['button-grid']} d-grid`}>
                        { mode === Mode.Init ? (
                            <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                        ) : mode === Mode.ClaimReady ? (
                            <button className="btn btn-lg btn-primary text-white" type="button">Claim <Amount value={amount} /> {REWARD_TOKEN.symbol}</button>
                        ) : (
                            <button className="btn btn-lg btn-primary text-white" type="button">Claim {REWARD_TOKEN.symbol}</button>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}