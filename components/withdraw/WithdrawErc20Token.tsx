import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Hash } from 'viem';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useBootstrap, useModalEvent } from '../../hooks/useBootstrap';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';
import { useCurrentChain } from '../../hooks/useCurrentChain';
import { useWithdrawService } from '../../hooks/useWithdrawService';
import css from '../../styles/components/farm/WithdrawErc20.module.scss';
import { Zero, bn, bnf } from '../../utils/bn';
import AmountInput from '../AmountInput';
import AmountPercent from '../AmountPercent';
import { SmallSpinner } from '../Spinner';
import { ACTION_RESULT_TOAST } from '../action-result/ActionResult';
import { WithdrawParam, ActionType } from '../../types';
import AsyncAmount from '../AmountAsync';
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../utils/async';
import { usePositionsService } from '../../hooks/usePositionsService';
import PriceFromFeed from '../PriceFromFeed';
import TokenIcon from '../TokenIcon';
import { AMOUNT_DP, AMOUNT_RM, AMOUNT_TRIM_ZERO } from '../Amount';

const enum Mode {
  NotConnected,
  Init,
  InsufficientBalance,
  WithdrawReady,
  ConfirmationOfWithdrawal,
  WaitingForWithdrawal,
}

export const WITHDRAW_ERC20_TOKEN_MODAL = 'withdraw-erc20-modal'

export default function WithdrawErc20Token({ comet, token, withdrawType, onWithdraw } : WithdrawParam) {

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ withdrawHash, setWithdrawHash ] = useState<Hash>()
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)

    const { isSuccess: isBalance, data: balance } = asyncBalance

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const positionsService = usePositionsService({ comet, publicClient })
    const withdrawService = useWithdrawService({ comet, publicClient, walletClient, account })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(WITHDRAW_ERC20_TOKEN_MODAL)

    useEffect(() => {
      if (!isConnected || !isBalance || !withdrawService) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
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
        const action = withdrawType
        const amountCopy = bn(amount)
        const hashCopy = structuredClone(withdrawHash)
        onWithdraw({ comet, action, token, amount: amountCopy, hash: hashCopy })
        hideModal(WITHDRAW_ERC20_TOKEN_MODAL)
      }
    }, [mode, withdrawHash])

    useEffect(() => {
      switch (modalEvent) {
        case 'show':
          onOpen()
          break
        case 'hidden':
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
      let promise
      if (withdrawType === ActionType.WithdrawBaseToken) {
        promise = positionsService.supplyBalanceOf(account)
      } else {
        promise = positionsService.collateralBalanceOf({ account, token })
      }
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
      const newInput = amount ? amount.toFixed() : ''
      const id = css['withdraw-input']
      const elem = document.getElementById(id) 
      const input = elem as HTMLInputElement
      input.value = newInput
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleWithdraw() {
      if (amount.isGreaterThan(Zero)) {
        setMode(Mode.ConfirmationOfWithdrawal)
        withdrawService.withdrawErc20Token({ token, amount }).then(setWithdrawHash)
      }
    }

    function handleBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor)
      setAmount(newAmount)
      setInput(newAmount)
    }

    return (
        <div id={WITHDRAW_ERC20_TOKEN_MODAL} className="modal" tabIndex={-1}>
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
                            Balance : <span className="text-body-tertiary"><AsyncAmount {...asyncBalance} /></span>
                          </div>
                      </div>
                  </div>
                  <div className="row g-2">
                    <AmountPercent handler={handleBalancePercent} />
                  </div>
                </div>
                <div className="d-grid">
                  { mode === Mode.Init &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                  }
                  { mode === Mode.NotConnected &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Connect your wallet</button>
                  }
                  { mode === Mode.InsufficientBalance &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Insufficient {token?.symbol} Balance</button>
                  }
                  { mode === Mode.WithdrawReady &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleWithdraw}>Withdraw {token?.symbol}</button>
                  }
                  { mode === Mode.ConfirmationOfWithdrawal &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}