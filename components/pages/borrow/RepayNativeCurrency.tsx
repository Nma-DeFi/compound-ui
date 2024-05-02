import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { ModalEvent, useBootstrap, useModalEvent } from '../../../hooks/useBootstrap'
import { Zero, bn, fromBigInt } from '../../../utils/bn'
import AmountInput from '../../AmountInput'
import AmountPercent, { fillInput } from '../../AmountPercent'
import TokenIcon from '../../TokenIcon'
import PriceFromFeed from '../../PriceFromFeed'
import css from '../../../styles/components/borrow/RepayNativeCurrency.module.scss'
import { useCurrentChain } from '../../../hooks/useCurrentChain'
import * as ChainUtils from '../../../utils/chains'
import { useCurrentAccount } from '../../../hooks/useCurrentAccount'
import { usePublicClient, useWalletClient } from 'wagmi'
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../../utils/async'
import AsyncAmount from '../../AmountAsync'
import Amount from '../../Amount'
import { SmallSpinner } from '../../Spinner'
import { useSupplyService } from '../../../hooks/useSupplyService'
import { Hash } from 'viem'
import { ActionType } from '../../../types'
import { REPAY_RESULT_TOAST } from './BorrowPositions'
import { usePositionsService } from '../../../hooks/usePositionsService'
import WarningMessage from '../../WarningMessage'
import Spacer from '../../Spacer'

const enum Mode {
  Init,
  InsufficientBalance,
  ExceedMaximumRepayment,
  RepaymentReady,
  ConfirmationOfRepayment,
  WaitingForRepayment,
}

export const REPAY_NATIVE_CURRENCY = 'repay-native-currency'

export default function RepayNativeCurrency({ comet, token, onRepay }) {
    const ACCRUED_ESTIMATION = 1.001

    const { currentChainId: chainId } = useCurrentChain()
    const { address } = useCurrentAccount()
    
    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ repayHash, setRepayHash ] = useState<Hash>()
    const [ action, setAction ] = useState<ActionType>()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()
    
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)
    const [ asyncBorrowBalance, setAsyncBorrowBalance ] = useState<AsyncBigNumber>(IdleData)

    const { isSuccess: isBalance, data: balance } = asyncBalance
    const { isSuccess: isBorrowBalance, data: borrowBalance } = asyncBorrowBalance

    const supplyService = useSupplyService({ publicClient, walletClient, comet, account: address })
    const positionsService = usePositionsService({ comet, publicClient })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(REPAY_NATIVE_CURRENCY)

    const nativeCurrency = ChainUtils.nativeCurrency(chainId)

    useEffect(() => {
      if (!isBalance || !isBorrowBalance) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else if (amount.isGreaterThan(borrowBalance)) {
        setMode(Mode.ExceedMaximumRepayment)
      } else {
        setMode(Mode.RepaymentReady)
      }
    }, [amount, balance, borrowBalance])

    useEffect(() => {
      if (mode === Mode.ConfirmationOfRepayment && repayHash) {
        setMode(Mode.WaitingForRepayment)
        const amountCopy = bn(amount)
        const hashCopy = structuredClone(repayHash)
        onRepay({ comet, action, token, amount: amountCopy, hash: hashCopy })
        hideModal(REPAY_NATIVE_CURRENCY)
      }
    }, [mode, repayHash])

    useEffect(() => {
      if (mode === Mode.Init && publicClient) {
        loadTokenBalance()
        loadBorrowBalance()
      }
    }, [mode, publicClient])

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
      if (mode === Mode.WaitingForRepayment) {
        openToast(REPAY_RESULT_TOAST)
      }
      resetState()
    }

    function resetState() {
      setMode(null)
      setAmount(Zero)
      setInput(null)
      setRepayHash(null)
      setAction(null)
    }

    function setInput(amount: BigNumber) {
      fillInput({ amount, token, id: css['repay-input'] })
    }
        
    function loadTokenBalance() {
      const promise = publicClient.getBalance({ address }).then(fromBigInt)
      loadAsyncData(promise, setAsyncBalance)
    }

    function loadBorrowBalance() {
      const promise = positionsService.borrowBalanceOf(address)
      loadAsyncData(promise, setAsyncBorrowBalance)
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    async function handleRepay() {
      setMode(Mode.ConfirmationOfRepayment)
      const estimedAccruedBorrowBalance = borrowBalance.times(ACCRUED_ESTIMATION).dp(token.decimals)
      const isMaxed = amount.isEqualTo(borrowBalance)
      const isEnoughBalance = estimedAccruedBorrowBalance.isLessThan(balance)
      console.log('isMaxed', isMaxed, amount.toFixed(), borrowBalance.toFixed())
      console.log('isEnoughBalance', isEnoughBalance, estimedAccruedBorrowBalance.toFixed(), balance.toFixed())
      let maxRepayRequest = null
      if (isMaxed && isEnoughBalance) {
        const [ isSuccess, data ] = await supplyService.simulateSupplyNativeCurrency({ amount: estimedAccruedBorrowBalance, maxed: true })
        if (isSuccess) {
          maxRepayRequest = data
        } else {
          console.warn(data)
        }
      }      
      let supplyPromise 
      if (maxRepayRequest) {
        setAction(ActionType.RepayMax)
        supplyPromise = supplyService.writeContract(maxRepayRequest)
      } else {
        setAction(ActionType.Repay)
        supplyPromise = supplyService.supplyNativeCurrency({ amount })
      }
      supplyPromise.then(setRepayHash)
    }

    function handleWalletBalancePercent(factor: number) {
      const newAmount = borrowBalance.times(factor).dp(token.decimals)
      setAmount(newAmount)
      setInput(newAmount)
    }

    return (
      <>
        <div id={REPAY_NATIVE_CURRENCY} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['repay-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Repay</h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['repay-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                        <AmountInput 
                          id={css['repay-input']} 
                          onChange={handleAmountChange} 
                          disabled={Mode.Init === mode} />
                        <div className="small text-body-tertiary">
                          <PriceFromFeed priceFeed={token?.priceFeed} amount={amount} />
                        </div>
                      </div>
                      <div>
                        <button type="button" className="btn btn-light border border-light-subtle rounded-4 mb-2">
                            <div className="d-flex align-items-center">
                                <TokenIcon symbol={nativeCurrency.symbol} width={30} />
                                <span className="px-3">{nativeCurrency.symbol}</span> 
                            </div>
                        </button>
                        <div className="text-center text-body-secondary small">
                          Balance : <span className="text-body-tertiary"><AsyncAmount {...asyncBorrowBalance} /></span>
                        </div>
                      </div>
                  </div>
                  <div className="row g-2">
                    <AmountPercent handler={handleWalletBalancePercent} />
                  </div>
                </div>
                { mode === Mode.ExceedMaximumRepayment ? (
                    <WarningMessage>Maximum repayment : <AsyncAmount {...asyncBorrowBalance} /></WarningMessage>
                  ) : mode === Mode.InsufficientBalance ? (
                    <WarningMessage>The {nativeCurrency.symbol} balance in your wallet is insufficient</WarningMessage>
                  ) : (
                    <Spacer />
                  )
                }
                <div className="d-grid">
                  { mode === Mode.Init ? (
                      <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                    )  : mode === Mode.RepaymentReady && amount.isGreaterThan(Zero) ? (
                      <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleRepay}>Repay <Amount value={amount} /> {nativeCurrency.symbol}</button>
                    ) : mode === Mode.ConfirmationOfRepayment ? (
                      <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
                    ) : (
                      <button className="btn btn-lg btn-primary text-white" type="button">Repay {nativeCurrency.symbol}</button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}



