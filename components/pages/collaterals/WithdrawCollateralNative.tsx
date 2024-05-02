import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Hash } from 'viem';
import { usePublicClient, useWaitForTransaction, useWalletClient } from 'wagmi';
import { CompoundConfig } from '../../../compound-config';
import { useAllowanceService } from '../../../hooks/useAllowanceService';
import { ModalEvent, useBootstrap, useModalEvent } from '../../../hooks/useBootstrap';
import { useCurrentAccount } from '../../../hooks/useCurrentAccount';
import { useCurrentChain } from '../../../hooks/useCurrentChain';
import { useWithdrawService } from '../../../hooks/useWithdrawService';
import css from '../../../styles/components/collaterals/WithdrawCollateralNative.module.scss';
import { AsyncBigNumber, AsyncData, IdleData, loadAsyncData } from '../../../utils/async';
import { Zero, bn } from '../../../utils/bn';
import * as ChainUtils from '../../../utils/chains';
import Amount from '../../Amount';
import AmountInput from '../../AmountInput';
import AmountPercent, { fillInput } from '../../AmountPercent';
import { SmallSpinner } from '../../Spinner';
import { ACTION_RESULT_TOAST } from '../../action-result/ActionResult';
import { WithdrawParam, ActionType } from '../../../types';
import AsyncAmount from '../../AmountAsync';
import { usePositionsService } from '../../../hooks/usePositionsService';
import PriceFromFeed from '../../PriceFromFeed';
import TokenIcon from '../../TokenIcon';
import { useCurrentMarket } from '../../../hooks/useCurrentMarket';
import { useLiquidationRiskByCollateralWithdrawal } from '../../../hooks/useLiquidationRisk';
import { LiquidationRiskAsync } from '../../LiquidationRisk';
import { useBorrowPositions } from '../../../hooks/useBorrowPositions';
import { isBorrowPosition } from '../../../redux/helpers/borrow';
import WarningMessage from '../../WarningMessage';
import Spacer from '../../Spacer';
import PlaceHolder, { PlaceHolderSize } from '../../PlaceHolder';

const enum Mode {
  NotConnected, 
  Init,
  ExceedCollateralBalance,
  LiquidationRiskTooHigh,
  BulkerNotApproved,
  ConfirmationOfBulkerApproval,
  WaitingForBulkerApproval,
  WithdrawReady,
  ConfirmationOfWithdrawal,
  WaitingForWithdrawal,
}

export const WITHDRAW_COLLATERAL_NATIVE_MODAL = 'withdraw-collateral-native-modal'

export default function WithdrawCollateralNative({ comet, token, onWithdraw } : WithdrawParam) {

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ bulkerApprovalHash, setBulkerApprovalHash ] = useState<Hash>()
    const [ withdrawHash, setWithdrawHash ] = useState<Hash>()
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)
    const [ bulkerPermission, setBulkerPermission ] = useState<AsyncData<boolean>>(IdleData)

    const { isSuccess: isBalance, data: balance } = asyncBalance
    const { isSuccess: isBulkerChecked, data: isBulkerApproved } = bulkerPermission

    const nativeCurrency = ChainUtils.nativeCurrency(chainId)

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(WITHDRAW_COLLATERAL_NATIVE_MODAL)

    const market = useCurrentMarket()

    const asyncLiquidationRisk = useLiquidationRiskByCollateralWithdrawal({ chainId, publicClient, market, collateral: token, amount }) 
    const { isSuccess: isLiquidationRisk, data: liquidationRisk} = asyncLiquidationRisk

    const positionsService = usePositionsService({ comet, publicClient })
    const allowanceService = useAllowanceService({ comet, publicClient, walletClient, account })
    const withdrawService = useWithdrawService({ comet, publicClient, walletClient, account })
    
    const asyncBorrowPositions = useBorrowPositions()

    const { 
      isLoading: isWaitingBulkerApproval, 
      isSuccess: isSuccessBulkerApproval 
    } = useWaitForTransaction({ hash: bulkerApprovalHash })

    const { bulker } = CompoundConfig[chainId].contracts

    useEffect(() => {
      if (!isConnected || !isBalance || !isBulkerChecked || !isLiquidationRisk || !withdrawService) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.ExceedCollateralBalance)
      }  else if (liquidationRisk > 100) {
        setMode(Mode.LiquidationRiskTooHigh)
      } else if (amount.isGreaterThan(Zero) && !isBulkerApproved) {
        setMode(Mode.BulkerNotApproved)
      } else {
        setMode(Mode.WithdrawReady)
      }
    }, [amount, balance, isBulkerApproved, liquidationRisk, withdrawService])

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
        const action = ActionType.WithdrawCollateral
        const amountCopy = bn(amount)
        const hashCopy = structuredClone(withdrawHash)
        onWithdraw({ comet, action, token, amount: amountCopy, hash: hashCopy })
        hideModal(WITHDRAW_COLLATERAL_NATIVE_MODAL)
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
      const promise = positionsService.collateralBalanceOf({ account, token })
      loadAsyncData(promise, setAsyncBalance)
    }

    function loadBulkerPermission() {
      const promise = allowanceService.hasPermission(account, bulker)
      loadAsyncData(promise, setBulkerPermission)
    }

    function resetState() {
      setAmount(Zero)
      setMode(null)
      setInput(null)
      setAsyncBalance(IdleData)
      setBulkerPermission(IdleData)
      setBulkerApprovalHash(null)
      setWithdrawHash(null)
    }
    
    function setInput(amount: BigNumber) {
      fillInput({ amount, token, id: css['withdraw-native-input'] })
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor).dp(token.decimals)
      setAmount(newAmount)
      setInput(newAmount)
    }

    function handleBulkerApproval() {
      allowanceService.allow(bulker, true).then(setBulkerApprovalHash)
    }

    function handleWithdraw() {
      setMode(Mode.ConfirmationOfWithdrawal)
      withdrawService.withdrawNativeCurrency({ amount }).then(setWithdrawHash)
    }

    return (
        <div id={WITHDRAW_COLLATERAL_NATIVE_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['withdraw-native-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Withdraw</h2>
                  { isConnected && (mode > Mode.ExceedCollateralBalance) && isBorrowPosition(comet, asyncBorrowPositions.data) &&
                    <div className="d-flex pe-3">
                      <span className="text-body-secondary pe-2">Liquidation risk :</span>                
                      { asyncLiquidationRisk.isSuccess ? ( 
                        <span className="text-body-tertiary"><LiquidationRiskAsync asyncRisk={asyncLiquidationRisk} /></span>
                      ) : (
                        <div style={{ width: '2rem' }}><PlaceHolder size={PlaceHolderSize.NORMAL} col={12} /></div>
                      )}
                    </div>
                  }
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['withdraw-native-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                      <AmountInput 
                          id={css['withdraw-native-input']} 
                          onChange={handleAmountChange} 
                          disabled={Mode.Init === mode} 
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
                            Balance : <span className="text-body-tertiary"><AsyncAmount { ...{ ...asyncBalance, idleData: '0'} } /></span>
                          </div>
                      </div>
                  </div>
                  <div className="row g-2">
                    <AmountPercent handler={handleBalancePercent} />
                  </div>
                </div>
                { mode === Mode.ExceedCollateralBalance ? (
                    <WarningMessage>
                      Exceeds your {nativeCurrency.symbol} collateral balance
                    </WarningMessage>
                  ) : mode === Mode.LiquidationRiskTooHigh ? (
                    <WarningMessage>
                      Liquidation risk too high
                    </WarningMessage>
                  ) :  (
                    <Spacer />
                  )
                }
                <div className="d-grid">
                  { mode === Mode.Init ?
                    <button className="btn btn-lg btn-primary text-white" type="button">Initialisation <SmallSpinner /></button>
                  : mode === Mode.NotConnected ?
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Connect Wallet</button>
                  : mode === Mode.BulkerNotApproved ?
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleBulkerApproval}>Activate withdrawal</button>
                  : mode === Mode.WaitingForBulkerApproval ?
                    <button className="btn btn-lg btn-primary text-white" type="button">Activating withdrawal ... Wait please <SmallSpinner /></button>
                  : [Mode.ConfirmationOfBulkerApproval, Mode.ConfirmationOfWithdrawal].includes(mode) ?
                    <button className="btn btn-lg btn-primary text-white" type="button">Confirmation <SmallSpinner /></button>
                  : mode === Mode.WithdrawReady && amount.isGreaterThan(Zero) ?
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleWithdraw}>Withdraw <Amount value={amount} /> {nativeCurrency.symbol}</button>
                  :
                    <button className="btn btn-lg btn-primary text-white" type="button">Withdraw {nativeCurrency.symbol}</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}