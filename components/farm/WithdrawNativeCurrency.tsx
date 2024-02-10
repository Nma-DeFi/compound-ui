import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Hash } from 'viem';
import { usePublicClient, useWaitForTransaction, useWalletClient } from 'wagmi';
import { CompoundConfig } from '../../compound-config';
import { useAllowService } from '../../hooks/useAllowService';
import { useBootstrap, useModalEvent } from '../../hooks/useBootstrap';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';
import { useCurrentChain } from '../../hooks/useCurrentChain';
import { useSupplyBalance } from '../../hooks/useSupplyBalance';
import { useWithdrawService } from '../../hooks/useWithdrawService';
import { Action, ActionInfo } from '../../pages/farm';
import * as MarketSelector from "../../selectors/market-selector";
import css from '../../styles/components/farm/WithdrawNative.module.scss';
import { AsyncData, IdleData, asyncExec } from '../../utils/async';
import { Zero, bn, bnf } from '../../utils/bn';
import * as ChainUtils from '../../utils/chains';
import Amount, { AmountDecimalPrecision } from '../Amount';
import AmountInput from '../AmountInput';
import AmountPercent from '../AmountPercent';
import Price from '../Price';
import { SmallSpinner } from '../Spinner';
import Result from './Result';

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

export default function WithdrawNativeCurrency(market) {

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const [ mode, setMode ] = useState<number>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ bulkerApprovalHash, setBulkerApprovalHash ] = useState<Hash>()
    const [ withdrawHash, setWithdrawHash ] = useState<Hash>()
    const [ withdrawInfo, setWithdrawInfo ] = useState<ActionInfo>()    
    const [ 
      { 
        isSuccess: isBulkerChecked, 
        data: isBulkerApproved 
      }, 
      setBulkerPermission 
    ] = useState<AsyncData<boolean>>(IdleData)

    const comet = MarketSelector.cometProxy(market)
    const nativeCurrency = ChainUtils.nativeCurrency(chainId)

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(WITHDRAW_NATIVE_CURRENCY_MODAL)

    const { isSuccess: isBalance, data: balance } = useSupplyBalance({ comet, publicClient, account })

    const allowService = useAllowService({ comet, publicClient, walletClient, account })
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

    }, [amount, isBalance, isBulkerChecked, withdrawService])

    useEffect(() => {
      if (withdrawHash && mode === Mode.ConfirmationOfWithdrawal) {
        setMode(Mode.WaitingForWithdrawal)
        setWithdrawInfo({ action: Action.Withdraw, token: nativeCurrency, amount, hash: withdrawHash })
        hideModal(WITHDRAW_NATIVE_CURRENCY_MODAL)
      }
    }, [withdrawHash])

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
      if (mode === Mode.Init && allowService) {
          loadBulkerPermission()
      }
    }, [allowService])

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
      if (mode === Mode.WaitingForWithdrawal) {
        openToast(WITHDRAW_NATIVE_CURRENCY_TOAST)
      }
      setMode(null)
    }

    function loadBulkerPermission() {
      const promise = allowService.hasPermission(account, bulker);
      asyncExec(promise, setBulkerPermission);
    }

    function initState() {
      setAmount(Zero)
      setInput(null)
      setWithdrawInfo(null)
      setBulkerApprovalHash(null)
      setBulkerPermission(IdleData)
      setWithdrawHash(null)
      setWithdrawInfo(null)
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
      const newInput = bnf(newAmount, AmountDecimalPrecision)
      setAmount(newAmount)
      setInput(newInput)
    }

    function handleBulkerApproval() {
      allowService.allow(bulker, true).then(setBulkerApprovalHash)
    }

    function handleWithdraw() {
      if (amount.isGreaterThan(Zero)) {
        setMode(Mode.ConfirmationOfWithdrawal)
        withdrawService.withdrawNativeCurrency({ amount }).then(setWithdrawHash)
      }
    }

    return (
      <>
        <Result {...{id: WITHDRAW_NATIVE_CURRENCY_TOAST, ...withdrawInfo}} />
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
                          <Price asset={nativeCurrency} amount={amount} />
                        </div>
                      </div>
                      <div>
                          <button type="button" className="btn btn-light border border-light-subtle rounded-4 mb-2">
                              <div className="d-flex align-items-center">
                                  <img src={`/images/tokens/${nativeCurrency.symbol}.svg`} alt={nativeCurrency.symbol} width="30" /> 
                                  <span className="px-3">{nativeCurrency.symbol}</span> 
                              </div>
                          </button>
                          <div className="text-center text-body-secondary small">Balance : <span className="text-body-tertiary"><Amount value={balance} /></span></div>
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