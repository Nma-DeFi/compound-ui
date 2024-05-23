import { useEffect, useState } from 'react'
import css from '../../../styles/components/claim/ClaimAllMarkets.module.scss'
import { SmallSpinner } from '../../Spinner'
import { chainIcon, chainName, transactionUrl } from '../../../utils/chains'
import { ModalEvent, useModalEvent } from '../../../hooks/useBootstrap'
import TokenIcon from '../../TokenIcon'
import Amount from '../../Amount'
import { Zero } from '../../../utils/bn'
import { COMP_TOKEN, RewardsService } from '../../../services/rewards-service'
import { getBaseTokenOrNativeCurrency } from '../../../utils/markets'
import { useRewardsOwed } from '../../../hooks/useRewardsOwed'
import { usePublicClient, useSwitchNetwork, useWalletClient } from 'wagmi'
import PriceFromSymbol from '../../PriceFromSymbol'
import { getTotalRewardsByChain } from '../../../redux/helpers/rewards'
import { useCurrentChain } from '../../../hooks/useCurrentChain'
import { useCurrentAccount } from '../../../hooks/useCurrentAccount'
import { Hash } from 'viem'
import { USER_REJECTED_TX } from '../../NetworkSelector'
import { useAppDispatch } from '../../../redux/hooks'
import { rewardsOwedResetByChain } from '../../../redux/slices/rewardsOwed'

export const CLAIM_ALL_MODAL = 'claim-all-modal'

const enum Mode {
    Init,
    ClaimReady,
    ConfirmTransaction,
    WaitingForTransaction,
    ClaimSuccess,
    ClaimFailure,
}

export default function ClaimAllMarkets({ chain }) {

    const [ mode, setMode ] = useState<Mode>()
    const [ hashes, setHashes ] = useState<Array<Hash>>()

    const { currentChainId } = useCurrentChain()
    const { address: account } = useCurrentAccount()
    
    const { switchNetworkAsync } = useSwitchNetwork()

    const dispatch = useAppDispatch()

    const publicClient = usePublicClient({ chainId: chain?.id })
    const { isSuccess: isWalletClient, data: walletClient } = useWalletClient({ chainId: chain?.id })

    const { isSuccess: isRewards, data: rewards } = useRewardsOwed()

    const modalEvent = useModalEvent(CLAIM_ALL_MODAL)

    useEffect(() => {
        if (mode === Mode.Init && isRewards && isWalletClient) {
            setMode(Mode.ClaimReady)
        }
      }, [mode, rewards, walletClient])

      useEffect(() => {
        if (mode === Mode.ConfirmTransaction && hashes.length > 0) {
            setMode(Mode.WaitingForTransaction)
            const receipts = hashes.map(hash => publicClient.waitForTransactionReceipt({ hash }))
            Promise.all(receipts)
                .then(() => { 
                    dispatch(rewardsOwedResetByChain({ chainId: currentChainId }))
                    setMode(Mode.ClaimSuccess) 
                })
                .catch(e => {
                    console.error(e)
                    setMode(Mode.ClaimFailure)
                })
        }
      }, [mode, hashes])

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
        resetState()
    }

    function resetState() {
        setMode(null)
        setHashes([])
    }

    function totalRewards() {
        return getTotalRewardsByChain({ rewardsOwed: rewards, chainId: chain.id })
    }

    function handleClaim() {
        setMode(Mode.ConfirmTransaction)
        const markets: Array<String> = Object.entries(rewards[chain.id])
            .filter(([_market, reward]) => reward.balance.isGreaterThan(Zero))
            .map(([market, _reward]) => market) 

        if (chain.id !== currentChainId) {
            switchNetworkAsync(chain.id)
                .then(chain => RewardsService.claimAllMarkets({ chain, account, markets, publicClient, walletClient }))
                .then(setHashes)
                .catch(error => {
                    if (error.name !== USER_REJECTED_TX) { throw error }
                    setMode(Mode.ClaimReady)
                })
        } else {
            RewardsService.claimAllMarkets({ chain, account, markets, publicClient, walletClient }).then(setHashes)
        }
    }

    return (
        <div id={CLAIM_ALL_MODAL} className="modal" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className={`${css['title']} d-flex justify-content-between align-items-center`}>
                            <h2 className="m-0">Claim all markets</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        { mode >= Mode.Init &&
                            <div className={`${css['chain']} d-flex align-items-center`}>
                                <div className={`${css['chain-label']} fw-semibold`}>Chain</div>
                                <img className={css['network-icon']} src={chainIcon(chain.id)} alt={chainName(chain.id)} />
                                {chainName(chain.id)}
                            </div>
                        }
                        { mode >= Mode.ClaimReady &&
                            <>
                                <table className="table border-top">
                                    <tbody>
                                    { chain.markets.map(market =>
                                        <tr key={market.id}>
                                            <td className={`${css['table-label']} table-light`}>
                                                <span className="fw-semibold">{ getBaseTokenOrNativeCurrency(market, chain.id).symbol }</span> Market
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <TokenIcon symbol={ COMP_TOKEN.symbol } css="me-2" width="20" />
                                                    <Amount value={ rewards[chain.id][market.id].balance } /> 
                                                    <span className="text-body-secondary ps-1">{ COMP_TOKEN.symbol }</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="fw-semibold pe-4">Total rewards :</div>
                                    <TokenIcon symbol={ COMP_TOKEN.symbol } css="me-2" width="20" />
                                    <Amount value={totalRewards()} /> 
                                    <div className="text-body-secondary ps-1">{COMP_TOKEN.symbol}</div>
                                    <div className="ps-3">
                                        <PriceFromSymbol symbol={COMP_TOKEN.symbol} amount={totalRewards()} placeHolderCfg={{ col: 2 }} />
                                    </div>
                                </div>
                            </>
                        }
                        { mode === Mode.ClaimSuccess &&
                            <div className="pt-4 text-center">
                                <div className="text-primary fs-4 mb-2">Success</div>
                                {hashes.map((txHash, index) => 
                                    <a href={transactionUrl({ chainId: currentChainId, txHash })} key={index} className="link-dark text-decoration-none" target="_blank" rel="noreferrer" >
                                        <p className="fs-6">Transaction {index + 1} <i className="bi bi-box-arrow-up-right"></i></p>
                                    </a>                                                            
                                )}
                            </div>
                        }
                        { mode === Mode.ClaimFailure &&
                            <div className="pt-4 text-center">
                                <h4 className="text-danger fs-4 mb-2">Failure</h4>
                                <p className="fs-6">See the browser console</p>
                            </div>
                        }
                        <div className={`${css['button-grid']} d-grid`}>
                        { mode === Mode.Init ? (
                            <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                        ) : mode === Mode.ClaimReady && totalRewards().isGreaterThan(Zero) ? (
                            <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleClaim}>Claim <Amount value={totalRewards()} /> {COMP_TOKEN.symbol}</button>
                        ) : mode === Mode.ConfirmTransaction ? (
                            <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
                        ) : (mode === Mode.WaitingForTransaction) ? (
                            <button className="btn btn-lg btn-primary text-white" type="button" disabled>Claiming rewards ... Wait please <SmallSpinner /></button>
                        ) : [Mode.ClaimSuccess, Mode.ClaimFailure].includes(mode) ? (
                            <button className="btn btn-lg btn-primary text-white" type="button" data-bs-dismiss="modal">Close</button>
                        ) :  (
                            <button className="btn btn-lg btn-primary text-white" type="button">Claim</button>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}