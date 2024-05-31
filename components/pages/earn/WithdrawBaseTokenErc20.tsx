import { useEffect, useState } from 'react'
import { useCurrentAccount } from '../../../hooks/useCurrentAccount'
import { useCurrentChain } from '../../../hooks/useCurrentChain'
import * as MarketSelector from '../../../selectors/market-selector'
import { ActionType, PriceFeed, Token } from '../../../types'
import * as MarketUtils from '../../../utils/markets'
import BigNumber from 'bignumber.js'
import { Zero, bn } from '../../../utils/bn'
import { Hash } from 'viem'
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../../utils/async'
import { usePublicClient, useWalletClient } from 'wagmi'
import { usePositionsService } from '../../../hooks/usePositionsService'
import { useWithdrawService } from '../../../hooks/useWithdrawService'
import { ModalEvent, useBootstrap, useModalEvent } from '../../../hooks/useBootstrap'
import { ACTION_RESULT_TOAST } from '../../action-result/ActionResult'
import css from '../../../styles/components/farm/WithdrawBaseTokenErc20.module.scss'
import AmountInput from '../../AmountInput'
import PriceFromFeed from '../../PriceFromFeed'
import TokenIcon from '../../TokenIcon'
import AsyncAmount from '../../AmountAsync'
import AmountPercent, { fillInput } from '../../AmountPercent'
import { SmallSpinner } from '../../Spinner'
import Amount from '../../Amount'
import WarningMessage from '../../WarningMessage'
import Spacer from '../../Spacer'


const enum Mode {
    NotConnected,
    Init,
    ExceedBalance,
    WithdrawReady,
    ConfirmationOfWithdrawal,
    WaitingForWithdrawal,
}
  
export const WITHDRAW_BASE_TOKEN_ERC20_MODAL = 'withdraw-base-token-erc20-modal'

export default function WithdrawBaseTokenErc20(market) {

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const comet = MarketSelector.cometProxy(market)
    const baseToken = MarketUtils.getBaseTokenOrNativeCurrency(market, chainId)
    
    const priceFeed : PriceFeed = {
        address: MarketSelector.baseTokePriceFeed(market),
        kind: MarketUtils.getPriceFeedKind(market, chainId)
    }

    const token: Token = {...baseToken, priceFeed }

    const onWithdraw = market.onAction

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ withdrawHash, setWithdrawHash ] = useState<Hash>()
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)

    const { isSuccess: isBalance, data: balance } = asyncBalance

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const positionsService = usePositionsService({ comet, publicClient })
    const withdrawService = useWithdrawService({ comet, publicClient, walletClient, account })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(WITHDRAW_BASE_TOKEN_ERC20_MODAL)

    useEffect(() => {
      if (!isConnected || !isBalance || !withdrawService) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.ExceedBalance)
      } else {
        setMode(Mode.WithdrawReady)
      }
    }, [amount, balance, withdrawService])

    useEffect(() => {
      if (mode === Mode.Init && positionsService) {
        loadBalance()
      }
    }, [mode, positionsService])

    useEffect(() => {
      if (mode === Mode.ConfirmationOfWithdrawal && withdrawHash) {
        setMode(Mode.WaitingForWithdrawal)
        const action = amount.isEqualTo(balance) ? ActionType.WithdrawMaxBaseToken : ActionType.WithdrawBaseToken
        const amountCopy = bn(amount)
        const hashCopy = structuredClone(withdrawHash)
        onWithdraw({ comet, action, token, amount: amountCopy, hash: hashCopy })
        hideModal(WITHDRAW_BASE_TOKEN_ERC20_MODAL)
      }
    }, [mode, withdrawHash])

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
      if (!isConnected) {
        setMode(Mode.NotConnected)
      } else {
        setMode(Mode.Init)
      }
    }

    function onHide() {
      if (mode === Mode.WaitingForWithdrawal) {
        openToast(ACTION_RESULT_TOAST)
      }
      resetState()
    }

    function loadBalance() {
      let promise = positionsService.supplyBalanceOf(account)
      loadAsyncData(promise, setAsyncBalance)
    }

    function resetState() {
      setAmount(Zero)
      setMode(null)
      setInput(null)
      setAsyncBalance(IdleData)
      setWithdrawHash(null)
    }
    
    function setInput(amount: BigNumber) {
      fillInput({ amount, id: css['withdraw-input'] })
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleWithdraw() {
      setMode(Mode.ConfirmationOfWithdrawal)
      const maxed = amount.isEqualTo(balance)
      withdrawService.withdrawErc20Token({ token, amount, maxed }).then(setWithdrawHash)
    }

    function handleBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor).dp(token.decimals)
      setAmount(newAmount)
      setInput(newAmount)
    }

    return (
        <div id={WITHDRAW_BASE_TOKEN_ERC20_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['withdraw-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Withdraw</h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['withdraw-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                      <AmountInput 
                          id={css['withdraw-input']} 
                          onChange={handleAmountChange} 
                          disabled={Mode.Init === mode} />
                        <div className="small text-body-tertiary">
                          <PriceFromFeed priceFeed={token?.priceFeed} amount={amount} />
                        </div>
                      </div>
                      <div>
                          <button type="button" className="btn btn-light border border-light-subtle rounded-4 mb-2">
                              <div className="d-flex align-items-center">
                                  <TokenIcon symbol={token?.symbol} width="30" />
                                  <span className="px-3">{token?.symbol}</span> 
                              </div>
                          </button>
                          <div className="text-center text-body-secondary small">
                            Balance : <span className="text-body-tertiary"><AsyncAmount { ...{ ...asyncBalance, idleData: '0'} } /></span>
                          </div>
                      </div>
                  </div>
                  <div className="row g-2">
                    <AmountPercent handler={handleBalancePercent} />
                  </div>
                </div>
                { mode === Mode.ExceedBalance ? (
                    <WarningMessage>Exceeds your {token?.symbol} protocol balance</WarningMessage>
                  ) : (
                    <Spacer />
                  )
                }
                <div className="d-grid">
                  { mode === Mode.Init ?
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                  : mode === Mode.NotConnected ?
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Connect Wallet</button>
                  : mode === Mode.ConfirmationOfWithdrawal ?
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
                  : mode === Mode.WithdrawReady && amount.isGreaterThan(Zero) ?
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleWithdraw}>Withdraw <Amount value={amount} /> {token?.symbol}</button>
                  : 
                    <button className="btn btn-lg btn-primary text-white" type="button">Withdraw {token?.symbol}</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}