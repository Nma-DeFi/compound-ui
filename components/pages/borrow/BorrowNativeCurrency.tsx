import { usePublicClient, useWaitForTransaction, useWalletClient } from "wagmi"
import Amount from "../../Amount"
import { usePriceFromFeed } from "../../../hooks/usePriceFromFeed"
import { useCurrentChain } from "../../../hooks/useCurrentChain"
import PriceAsync from "../../PriceAsync"
import { nf } from "../../../utils/number"
import * as ChainUtils from '../../../utils/chains'
import { useEffect, useState } from "react"
import { useBootstrap, useModalEvent } from "../../../hooks/useBootstrap"
import { SmallSpinner } from "../../Spinner"
import { Hash } from "viem"
import { useWithdrawService } from "../../../hooks/useWithdrawService"
import { useCurrentAccount } from "../../../hooks/useCurrentAccount"
import css from '../../../styles/components/borrow/BorrowNativeCurrency.module.scss'
import TokenIcon from "../../TokenIcon"
import { LiquidationRiskProgress } from "../../LiquidationRisk"
import { useAllowanceService } from "../../../hooks/useAllowanceService"
import { usePositionsService } from "../../../hooks/usePositionsService"
import { AsyncBigNumber, AsyncBoolean, IdleData, loadAsyncData } from "../../../utils/async"
import { CompoundConfig } from "../../../compound-config"
import { BORROW_RESULT_TOAST } from "../../../pages/borrow"
import { ActionType } from "../../../types"

const enum Mode {
  Init,
  BulkerNotApproved,
  ConfirmBulkerApproval,
  WaitingForBulkerApproval,
  BorrowReady,
  ConfirmBorrowing,
  WaitingForBorrowing,
}

export const BORROW_NATIVE_MODAL = 'borrow-native-currency'

export default function BorrowNativeCurrency({ comet, token, amount, priceFeed, borrowApr, liquidationRisk, onBorrow }) {
  
  const [ mode, setMode ] = useState<Mode>()
  const [ bulkerApprovalHash, setBulkerApprovalHash ] = useState<Hash>()
  const [ borrowHash, setBorrowHash ] = useState<Hash>()
  const [ asyncBorrowBalance, setAsyncBorrowBalance ] = useState<AsyncBigNumber>(IdleData)
  const [ bulkerPermission, setBulkerPermission ] = useState<AsyncBoolean>(IdleData)

  const { address: account } = useCurrentAccount()

  const { currentChainId: chainId } = useCurrentChain()

  const publicClient = usePublicClient({ chainId })

  const { data: walletClient } = useWalletClient()

  const positionsService = usePositionsService({ comet, publicClient })
  const allowanceService = useAllowanceService({ comet, publicClient, walletClient, account })
  const withdrawService = useWithdrawService({ comet, publicClient, walletClient, account })

  const price = usePriceFromFeed({ chainId, publicClient, amount, priceFeed })

  const modalEvent = useModalEvent(BORROW_NATIVE_MODAL)

  const { hideModal, openToast } = useBootstrap()

  const { isSuccess: isBorrowBalance, data: borrowBalance } = asyncBorrowBalance
  const { isSuccess: isBulkerChecked, data: isBulkerApproved } = bulkerPermission

  const nativeCurrency = ChainUtils.nativeCurrency(chainId)

  const { bulker } = CompoundConfig[chainId].contracts

  const { 
    isLoading: isWaitingBulkerApproval, 
    isSuccess: isSuccessBulkerApproval 
  } = useWaitForTransaction({ hash: bulkerApprovalHash })

  useEffect(() => {
    if (!isBorrowBalance || !isBulkerChecked || !withdrawService) return
    if (!isBulkerApproved) {
      setMode(Mode.BulkerNotApproved)
    } else {
      setMode(Mode.BorrowReady)
    }
  }, [amount, borrowBalance, isBulkerApproved, withdrawService])

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
      loadBorrowBalance()
    }
  }, [mode, positionsService])
  
  useEffect(() => {
    if (mode === Mode.Init && allowanceService) {
      loadBulkerPermission()
    }
  }, [mode, allowanceService])

  useEffect(() => {
    if (mode === Mode.ConfirmBorrowing && borrowHash) {
      setMode(Mode.WaitingForBorrowing)
      const action = ActionType.Borrow
      const hash = structuredClone(borrowHash)
      onBorrow({ action, token, amount, hash })
      hideModal(BORROW_NATIVE_MODAL)
    }
  }, [mode, borrowHash])
  
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
    setMode(Mode.Init)
  }

  function onHide() {
    if (mode === Mode.WaitingForBorrowing) {
      openToast(BORROW_RESULT_TOAST)
    }
    setMode(null)
    setAsyncBorrowBalance(IdleData)
    setBulkerPermission(IdleData)
    setBulkerApprovalHash(null)
    setBorrowHash(null)
  }

  function loadBorrowBalance() {
    const promise = positionsService.borrowBalanceOf(account)
    loadAsyncData(promise, setAsyncBorrowBalance)
  }

  function loadBulkerPermission() {
    const promise = allowanceService.hasPermission(account, bulker)
    loadAsyncData(promise, setBulkerPermission)
  }

  function handleBulkerApproval() {
    allowanceService.allow(bulker, true).then(setBulkerApprovalHash)
  }

  function handleBorrow() {
    setMode(Mode.ConfirmBorrowing)
    withdrawService.withdrawNativeCurrency({ amount }).then(setBorrowHash)
  }

  return (
    <div id={BORROW_NATIVE_MODAL} className="modal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className={`${css['title']} d-flex justify-content-between align-items-center`}>
              <h3 className="m-0">Confirm borrowing</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <td className={`${css['table-label']} table-light fw-semibold`}>Borrow amount</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <TokenIcon symbol={ token?.symbol } css="me-1" width="20" />
                      <Amount value={ amount } /> 
                      <span className="text-body-secondary ps-1">{ token?.symbol }</span>
                      <small className="ps-3 text-body-secondary">(<PriceAsync asyncPrice={price} />)</small>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={`${css['table-label']} table-light fw-semibold`}>Borrow APR</td>
                  <td className="text-center">{ nf(borrowApr) }<small className="text-body-secondary">%</small></td>
                </tr>
                <tr>
                  <td className={`${css['table-label']} table-light fw-semibold`}>Liquidation risk</td>
                  <td className="align-middle px-3">
                    <LiquidationRiskProgress {...{ risk: liquidationRisk, css: '', style: { height: '20px' } }} />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={`${css['button-grid']} d-grid`}>
              { mode === Mode.Init &&
                <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
              }
              { mode === Mode.BulkerNotApproved &&
                <button className="btn btn-lg btn-primary text-white" type="button"  onClick={handleBulkerApproval}>Activate borrowing</button>
              }
              { mode === Mode.WaitingForBulkerApproval &&
                <button className="btn btn-lg btn-primary text-white" type="button" disabled>Activating borrowing ... Wait please <SmallSpinner /></button>
              }
              { mode === Mode.BorrowReady &&
                <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleBorrow}>Borrow {nativeCurrency.symbol}</button>
              }
              { [Mode.ConfirmBulkerApproval, Mode.ConfirmBorrowing].includes(mode) &&
                <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
              }
            </div>
          </div>        
        </div>
      </div>
    </div>
  )
}