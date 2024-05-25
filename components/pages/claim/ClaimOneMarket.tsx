import { useEffect, useState } from 'react'
import { ModalEvent, useBootstrap, useModalEvent } from '../../../hooks/useBootstrap'
import { useRewardsOwed } from '../../../hooks/useRewardsOwed'
import { COMP_TOKEN, RewardsService } from '../../../services/rewards-service'
import css from '../../../styles/components/claim/ClaimOneMarket.module.scss'
import Amount from '../../Amount'
import TokenIcon from '../../TokenIcon'
import BigNumber from 'bignumber.js'
import { SmallSpinner } from '../../Spinner'
import PriceFromSymbol from '../../PriceFromSymbol'
import { chainIcon, chainName } from '../../../utils/chains'
import { getBaseTokenOrNativeCurrency } from '../../../utils/markets'
import { Zero, bn } from '../../../utils/bn'
import { useCurrentAccount } from '../../../hooks/useCurrentAccount'
import { usePublicClient, useSwitchNetwork, useWalletClient } from 'wagmi'
import { useCurrentChain } from '../../../hooks/useCurrentChain'
import { USER_REJECTED_TX } from '../../NetworkSelector'
import { Hash } from 'viem'
import { ActionType } from '../../../types'
import { ACTION_RESULT_TOAST } from '../../action-result/ActionResult'
import { cometProxy } from '../../../selectors/market-selector'

export const CLAIM_MODAL = 'claim-modal'

const enum Mode {
    Init,
    ClaimReady,
    ConfirmTransaction,
    WaitingForTransaction,
}

export default function ClaimOneMarket({ chain, market, onClaim }) {

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>()
    const [ hash, setHash ] = useState<Hash>()

    const { currentChainId } = useCurrentChain()
    const { address: account } = useCurrentAccount()

    const { switchNetworkAsync } = useSwitchNetwork()

    const { isSuccess: isRewards, data: rewards } = useRewardsOwed()

    const publicClient = usePublicClient({ chainId: chain?.id })
    const { isSuccess: isWalletClient, data: walletClient } = useWalletClient({ chainId: chain?.id })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(CLAIM_MODAL)

    const comet = cometProxy(market)

    useEffect(() => {
        if (mode === Mode.Init && isRewards && isWalletClient) {
            if ((chain.id in rewards) && (market.id in rewards[chain.id])) {
                setAmount(rewards[chain.id][market.id].balance)
                setMode(Mode.ClaimReady)
            } 
        }
      }, [mode, rewards, walletClient])

      useEffect(() => {
        if (mode === Mode.ConfirmTransaction && hash) {
          setMode(Mode.WaitingForTransaction)
          const action = ActionType.ClaimOneMarket
          const token = COMP_TOKEN
          const comet = market.id
          const claimChainId = chain.id
          const amountCopy = bn(amount)
          const hashCopy = structuredClone(hash)
          onClaim({ action, comet, token, claimChainId, amount: amountCopy, hash: hashCopy })
          hideModal(CLAIM_MODAL)
        }
      }, [mode, hash])

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
        if (mode === Mode.WaitingForTransaction) {
            openToast(ACTION_RESULT_TOAST)
        }
        resetState()
    }

    function resetState() {
        setMode(null)
        setAmount(null)
        setHash(null)
    }

    function handleClaim() {
        setMode(Mode.ConfirmTransaction)
        if (chain.id !== currentChainId) {
            switchNetworkAsync(chain.id)
                .then(chain => RewardsService.claim({ chain, account, market: comet, publicClient, walletClient }))
                .then(setHash)
                .catch(error => {
                    if (error.name !== USER_REJECTED_TX) { throw error }
                    setMode(Mode.ClaimReady)
                })
        } else {
            RewardsService.claim({ chain, account, market: comet, publicClient, walletClient }).then(setHash)
        }
    }

    return (
        <div id={CLAIM_MODAL} className="modal" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className={`${css['title']} d-flex justify-content-between align-items-center`}>
                            <h2 className="m-0">Claim rewards</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            { mode >= Mode.Init &&
                                <div className={`${css['chain']} d-flex align-items-center`}>
                                    <div className={`${css['chain-label']} fw-semibold`}>Chain</div>
                                    <img className={css['network-icon']} src={chainIcon(chain.id)} alt={chainName(chain.id)} />
                                    {chainName(chain.id)}
                                </div>
                            }
                        <table className="table border-top">
                            <tbody>
                                <tr>
                                    <td className={`${css['table-label']} table-light fw-semibold`}>Market</td>
                                    <td className="text-center">
                                    { mode >= Mode.ClaimReady &&
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
                                    { mode >= Mode.ClaimReady &&
                                        <div className="d-flex justify-content-center align-items-center">
                                            <TokenIcon symbol={ COMP_TOKEN.symbol } css="me-2" width="20" />
                                            <Amount value={amount} /> 
                                            <span className="text-body-secondary ps-1">{ COMP_TOKEN.symbol }</span>
                                            <span className="ps-3"><PriceFromSymbol symbol={COMP_TOKEN.symbol} amount={amount} placeHolderCfg={{ col: 2 }} /></span>
                                        </div>
                                    }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={`${css['button-grid']} d-grid`}>
                        { mode === Mode.Init ? (
                            <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                        ) : mode === Mode.ClaimReady && amount.isGreaterThan(Zero) ? (
                            <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleClaim}>Claim <Amount value={amount} /> {COMP_TOKEN.symbol}</button>
                        ) : mode === Mode.ConfirmTransaction ? (
                            <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
                        ) : (
                            <button className="btn btn-lg btn-primary text-white" type="button">Claim</button>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}