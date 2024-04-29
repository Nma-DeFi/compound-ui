import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Hash } from 'viem';
import { usePublicClient, useWalletClient } from 'wagmi';
import { ModalEvent, useBootstrap, useModalEvent } from '../../../hooks/useBootstrap';
import { useCurrentAccount } from '../../../hooks/useCurrentAccount';
import { useCurrentChain } from '../../../hooks/useCurrentChain';
import { useWithdrawService } from '../../../hooks/useWithdrawService';
import css from '../../../styles/components/collaterals/WithdrawCollateralErc20.module.scss';
import { Zero, bn } from '../../../utils/bn';
import AmountInput from '../../AmountInput';
import AmountPercent, { fillInput } from '../../AmountPercent';
import { SmallSpinner } from '../../Spinner';
import { ACTION_RESULT_TOAST } from '../../action-result/ActionResult';
import { WithdrawParam, ActionType } from '../../../types';
import AsyncAmount from '../../AmountAsync';
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../../utils/async';
import { usePositionsService } from '../../../hooks/usePositionsService';
import PriceFromFeed from '../../PriceFromFeed';
import TokenIcon from '../../TokenIcon';
import { useLiquidationRiskByCollateralWithdrawal } from '../../../hooks/useLiquidationRisk';
import { useCurrentMarket } from '../../../hooks/useCurrentMarket';
import { LiquidationRiskAsync } from '../../LiquidationRisk';
import { useBorrowPositions } from '../../../hooks/useBorrowPositions';
import { isBorrowPosition } from '../../../redux/helpers/borrow';
import Amount from '../../Amount';
import WarningAlert from '../../WarningAlert';
import Spacer from '../../Spacer';

const enum Mode {
  NotConnected,
  Init,
  ExceedCollateralBalance,
  LiquidationRiskTooHigh,
  WithdrawReady,
  ConfirmationOfWithdrawal,
  WaitingForWithdrawal,
}

export const WITHDRAW_COLLATERAL_ERC20_MODAL = 'withdraw-collateral-erc20-modal'

export default function WithdrawCollateralErc20({ comet, token, onWithdraw } : WithdrawParam) {

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ withdrawHash, setWithdrawHash ] = useState<Hash>()
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)

    const { isSuccess: isBalance, data: balance } = asyncBalance

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const market = useCurrentMarket()

    const asyncLiquidationRisk = useLiquidationRiskByCollateralWithdrawal({ chainId, publicClient, market, collateral: token, amount }) 
    const { isSuccess: isLiquidationRisk, data: liquidationRisk } = asyncLiquidationRisk

    const positionsService = usePositionsService({ comet, publicClient })
    const withdrawService = useWithdrawService({ comet, publicClient, walletClient, account })

    const asyncBorrowPositions = useBorrowPositions()

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(WITHDRAW_COLLATERAL_ERC20_MODAL)

    useEffect(() => {
      if (!isConnected || !isBalance || !isLiquidationRisk || !withdrawService) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.ExceedCollateralBalance)
      } else if (liquidationRisk > 100) {
        setMode(Mode.LiquidationRiskTooHigh)
      } else {
        setMode(Mode.WithdrawReady)
      }
    }, [amount, balance, liquidationRisk, withdrawService])

    useEffect(() => {
      if (mode === Mode.Init && positionsService) {
        loadBalance()
      }
    }, [mode, positionsService])

    useEffect(() => {
      if (mode === Mode.ConfirmationOfWithdrawal && withdrawHash) {
        setMode(Mode.WaitingForWithdrawal)
        const action = ActionType.WithdrawCollateral
        const amountCopy = bn(amount)
        const hashCopy = structuredClone(withdrawHash)
        onWithdraw({ comet, action, token, amount: amountCopy, hash: hashCopy })
        hideModal(WITHDRAW_COLLATERAL_ERC20_MODAL)
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

    function resetState() {
      setAmount(Zero)
      setMode(null)
      setInput(null)
      setAsyncBalance(IdleData)
      setWithdrawHash(null)
    }
    
    function setInput(amount: BigNumber) {
      fillInput({ amount, token, id: css['withdraw-input'] })
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleWithdraw() {
      setMode(Mode.ConfirmationOfWithdrawal)
      withdrawService.withdrawErc20Token({ token, amount }).then(setWithdrawHash)
    }

    function handleBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor).dp(token.decimals)
      setAmount(newAmount)
      setInput(newAmount)
    }

    return (
        <div id={WITHDRAW_COLLATERAL_ERC20_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['withdraw-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Withdraw</h2>
                  { isConnected && (mode > Mode.ExceedCollateralBalance) && isBorrowPosition(comet, asyncBorrowPositions.data) &&
                    <div className="d-flex pe-3">
                      <span className="text-body-secondary pe-2">Liquidation risk :</span>
                      <span className="text-body-tertiary"><LiquidationRiskAsync asyncRisk={asyncLiquidationRisk} /></span>
                    </div>
                  }
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
                { mode === Mode.ExceedCollateralBalance ? (
                    <WarningAlert>
                      Exceed {token?.symbol} Balance
                    </WarningAlert>
                  ) : mode === Mode.LiquidationRiskTooHigh ? (
                    <WarningAlert>
                      Liquidation risk too high
                    </WarningAlert>
                  ) :  (
                    <Spacer />
                  )
                }
                <div className="d-grid">
                  { mode === Mode.Init &&
                    <button className="btn btn-lg btn-primary text-white" type="button">Initialisation <SmallSpinner /></button>
                  }
                  { mode === Mode.NotConnected &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Connect Wallet</button>
                  }
                  { mode === Mode.ExceedCollateralBalance &&
                    <button className="btn btn-lg btn-primary text-white" type="button">Exceed {token?.symbol} Balance</button>
                  }
                  { mode === Mode.LiquidationRiskTooHigh &&
                    <button className="btn btn-lg btn-primary text-white" type="button">Liquidation risk too high</button>
                  }
                  { mode === Mode.ConfirmationOfWithdrawal &&
                    <button className="btn btn-lg btn-primary text-white" type="button">Confirmation <SmallSpinner /></button>
                  }
                  { mode === Mode.WithdrawReady &&
                    <>
                      { amount.isGreaterThan(Zero) ? (
                          <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleWithdraw}>Withdraw <Amount value={amount} /> {token?.symbol}</button>
                        ) : (
                          <button className="btn btn-lg btn-primary text-white" type="button">Withdraw {token?.symbol}</button>
                        )
                      }
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}