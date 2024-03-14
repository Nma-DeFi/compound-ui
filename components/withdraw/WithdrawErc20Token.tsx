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
import ActionResult from '../action-result/ActionResult';
import { WithdrawParam, ActionType, ActionInfo } from '../../types';
import AsyncAmount from '../AmountAsync';
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../utils/async';
import { usePositionsService } from '../../hooks/usePositionsService';
import PriceFromFeed from '../PriceFromFeed';
import TokenIcon from '../TokenIcon';

const Mode = {
  NotConnected: 0,
  Init: 1,
  InsufficientBalance: 2,
  WithdrawReady: 3,
  ConfirmationOfWithdrawal: 4,
  WaitingForWithdrawal: 5
}

export const WITHDRAW_ERC20_TOKEN_MODAL = 'withdraw-erc20-modal'
export const WITHDRAW_ERC20_TOKEN_TOAST = 'withdraw-erc20-toast'

export default function WithdrawErc20Token({comet, token, withdrawType } : WithdrawParam) {

    const [ mode, setMode ] = useState<number>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ withdrawHash, setWithdrawHash ] = useState<Hash>()
    const [ withdrawInfo, setWithdrawInfo ] = useState<ActionInfo>()
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
        setWithdrawInfo({ action: withdrawType, token, amount, hash: withdrawHash })
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
      initState()
      if (!isConnected) {
        setMode(Mode.NotConnected)
      } else {
        setMode(Mode.Init)
      }
    }

    function onHide() {
      let clearWithdrawData = true
      if (mode === Mode.WaitingForWithdrawal) {
        openToast(WITHDRAW_ERC20_TOKEN_TOAST)
        clearWithdrawData = false
      }
      initState(clearWithdrawData)
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

    function initState(initWithdrawData = true) {
      setAmount(Zero)
      setMode(null)
      setInput(null)
      setAsyncBalance(IdleData)
      if (initWithdrawData) {
        setWithdrawHash(null)
        setWithdrawInfo(null)
      }
    }
    
    function setInput(value: string) {
      const elem = document.getElementById(css['withdraw-input']) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
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
      const newInput = bnf(newAmount)
      setAmount(newAmount)
      setInput(newInput)
    }

    return (
      <>
        <ActionResult {...{id: WITHDRAW_ERC20_TOKEN_TOAST, ...withdrawInfo}} />
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
                          disabled={Mode.Init === mode} 
                          focused={false} />
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
      </>
    )
}