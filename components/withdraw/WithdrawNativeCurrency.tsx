import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Hash } from 'viem';
import { usePublicClient, useWaitForTransaction, useWalletClient } from 'wagmi';
import { CompoundConfig } from '../../compound-config';
import { useAllowanceService } from '../../hooks/useAllowanceService';
import { useBootstrap, useModalEvent } from '../../hooks/useBootstrap';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';
import { useCurrentChain } from '../../hooks/useCurrentChain';
import { useWithdrawService } from '../../hooks/useWithdrawService';
import css from '../../styles/components/farm/WithdrawNative.module.scss';
import { AsyncBigNumber, AsyncData, IdleData, loadAsyncData } from '../../utils/async';
import { Zero, bn, bnf } from '../../utils/bn';
import * as ChainUtils from '../../utils/chains';
import { AMOUNT_DP } from '../Amount';
import AmountInput from '../AmountInput';
import AmountPercent from '../AmountPercent';
import { SmallSpinner } from '../Spinner';
import ActionResult from '../action-result/ActionResult';
import { WithdrawParam, ActionType, ActionInfo } from '../../types';
import AsyncAmount from '../AmountAsync';
import { usePositionsService } from '../../hooks/usePositionsService';
import PriceFromFeed from '../PriceFromFeed';
import TokenIcon from '../TokenIcon';

const Mode = {
  NotConnected: 0,
  Init: 1,
  InsufficientBalance: 2,
  BulkerNotApproved: 3,
  ConfirmationOfBulkerApproval: 4,
  WaitingForBulkerApproval: 5,
  WithdrawReady: 6,
  ConfirmationOfWithdrawal: 7,
  WaitingForWithdrawal: 8,
}

export const WITHDRAW_NATIVE_CURRENCY_MODAL = 'withdraw-native-modal'
export const WITHDRAW_NATIVE_CURRENCY_TOAST = 'withdraw-native-toast'

export default function WithdrawNativeCurrency({ comet, token, withdrawType } : WithdrawParam) {

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const [ mode, setMode ] = useState<number>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ bulkerApprovalHash, setBulkerApprovalHash ] = useState<Hash>()
    const [ withdrawHash, setWithdrawHash ] = useState<Hash>()
    const [ withdrawInfo, setWithdrawInfo ] = useState<ActionInfo>()    
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)
    const [ bulkerPermission, setBulkerPermission ] = useState<AsyncData<boolean>>(IdleData)

    const { isSuccess: isBalance, data: balance } = asyncBalance
    const { isSuccess: isBulkerChecked, data: isBulkerApproved } = bulkerPermission

    const nativeCurrency = ChainUtils.nativeCurrency(chainId)

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(WITHDRAW_NATIVE_CURRENCY_MODAL)

    const positionsService = usePositionsService({ comet, publicClient })
    const allowanceService = useAllowanceService({ comet, publicClient, walletClient, account })
    const withdrawService = useWithdrawService({ comet, publicClient, walletClient, account })

    const { 
      isLoading: isWaitingBulkerApproval, 
      isSuccess: isSuccessBulkerApproval 
    } = useWaitForTransaction({ hash: bulkerApprovalHash })

    const { bulker } = CompoundConfig[chainId].contracts

    useEffect(() => {
      if (!isConnected || !isBalance || !isBulkerChecked || !withdrawService) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else if (amount.isGreaterThan(Zero) && !isBulkerApproved) {
        setMode(Mode.BulkerNotApproved)
      } else {
        setMode(Mode.WithdrawReady)
      }
    }, [amount, balance, isBulkerApproved, withdrawService])

    useEffect(() => { 
      if (isWaitingBulkerApproval) {
        setMode(Mode.WaitingForBulkerApproval)
      } 
    }, [isWaitingBulkerApproval])
    
    useEffect(() => { 
      if (isSuccessBulkerApproval) {
        loadBulkerPermission()
      } 
    }, [isSuccessBulkerApproval])

    useEffect(() => {
      if (mode === Mode.Init && positionsService) {
        loadBalance()
      }
    }, [mode, positionsService])
    
    useEffect(() => {
      if (mode === Mode.Init && allowanceService) {
        loadBulkerPermission()
      }
    }, [mode, allowanceService])
    
    useEffect(() => {
      if (mode === Mode.ConfirmationOfWithdrawal && withdrawHash) {
        setMode(Mode.WaitingForWithdrawal)
        setWithdrawInfo({ action: withdrawType, token: nativeCurrency, amount, hash: withdrawHash })
        hideModal(WITHDRAW_NATIVE_CURRENCY_MODAL)
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
        openToast(WITHDRAW_NATIVE_CURRENCY_TOAST)
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
      loadAsyncData(promise, setAsyncBalance);
    }

    function initState(initWithdrawData = true) {
      setAmount(Zero)
      setMode(null)
      setInput(null)
      setAsyncBalance(IdleData)
      setBulkerPermission(IdleData)
      setBulkerApprovalHash(null)
      if (initWithdrawData) {
        setWithdrawHash(null)
        setWithdrawInfo(null)
      }
    }

    function loadBulkerPermission() {
      const promise = allowanceService.hasPermission(account, bulker)
      loadAsyncData(promise, setBulkerPermission)
    }
    
    function setInput(value: string) {
      const id = css['withdraw-native-input']
      const elem = document.getElementById(id) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor)
      const newInput = bnf(newAmount, AMOUNT_DP)
      setAmount(newAmount)
      setInput(newInput)
    }

    function handleBulkerApproval() {
      allowanceService.allow(bulker, true).then(setBulkerApprovalHash)
    }

    function handleWithdraw() {
      if (amount.isGreaterThan(Zero)) {
        setMode(Mode.ConfirmationOfWithdrawal)
        withdrawService.withdrawNativeCurrency({ amount }).then(setWithdrawHash)
      }
    }

    return (
      <>
        <ActionResult {...{id: WITHDRAW_NATIVE_CURRENCY_TOAST, ...withdrawInfo}} />
        <div id={WITHDRAW_NATIVE_CURRENCY_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['withdraw-native-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Withdraw</h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['withdraw-native-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                      <AmountInput 
                          id={css['withdraw-native-input']} 
                          onChange={handleAmountChange} 
                          disabled={Mode.Init === mode} 
                          focused={[Mode.NotConnected, Mode.WithdrawReady].includes(mode)}
                        />
                        <div className="small text-body-tertiary">
                          <PriceFromFeed priceFeed={token?.priceFeed} amount={amount} />
                        </div>
                      </div>
                      <div>
                          <button type="button" className="btn btn-light border border-light-subtle rounded-4 mb-2">
                              <div className="d-flex align-items-center">
                                  <TokenIcon symbol={nativeCurrency.symbol} width="30" />
                                  <span className="px-3">{nativeCurrency.symbol}</span> 
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
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Insufficient {nativeCurrency.symbol} Balance</button>
                  }
                  { mode === Mode.BulkerNotApproved &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleBulkerApproval}>Activate withdrawal</button>
                  }
                  { mode === Mode.WaitingForBulkerApproval &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Activating withdrawal ... Wait please <SmallSpinner /></button>
                  }
                  { mode === Mode.WithdrawReady &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleWithdraw}>Withdraw {nativeCurrency.symbol}</button>
                  }
                  { [Mode.ConfirmationOfBulkerApproval, Mode.ConfirmationOfWithdrawal].includes(mode) &&
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