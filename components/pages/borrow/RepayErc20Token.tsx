import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { ModalEvent, useBootstrap, useModalEvent } from '../../../hooks/useBootstrap'
import { Zero, bn } from '../../../utils/bn'
import AmountInput from '../../AmountInput'
import AmountPercent, { fillInput } from '../../AmountPercent'
import { SmallSpinner } from '../../Spinner'
import TokenIcon from '../../TokenIcon'
import css from '../../../styles/components/borrow/RepayErc20.module.scss'
import PriceFromFeed from '../../PriceFromFeed'
import { useCurrentChain } from '../../../hooks/useCurrentChain'
import { useCurrentAccount } from '../../../hooks/useCurrentAccount'
import { usePublicClient, useWaitForTransaction, useWalletClient } from 'wagmi'
import { useErc20Service } from '../../../hooks/useErc20Service'
import { AsyncBigNumber, IdleData, SuccessData, loadAsyncData } from '../../../utils/async'
import AsyncAmount from '../../AmountAsync'
import { Hash } from 'viem'
import Amount from '../../Amount'
import { useSupplyService } from '../../../hooks/useSupplyService'
import { ActionType } from '../../../types'
import { usePositionsService } from '../../../hooks/usePositionsService'
import { REPAY_RESULT_TOAST } from './BorrowPositions'
import Spacer from '../../Spacer'
import WarningMessage from '../../WarningMessage'

const enum Mode {
  Init,
  ExceedMaximumRepayment,
  InsufficientBalance,
  InsufficientAllowance,
  ConfirmationOfApproval,
  WaitingForApproval,
  RepaymentReady,
  ConfirmationOfRepayment,
  WaitingForRepayment,
}

export const REPAY_ERC20_TOKEN_MODAL = 'repay-erc20-modal'

export default function RepayErc20Token({ comet, token, onRepay }) {
    const ACCRUED_ESTIMATION = 1.001

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ approvalHash, setApprovalHash ] = useState<Hash>()
    const [ repayHash, setRepayHash ] = useState<Hash>()
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)
    const [ asyncAllowance, setAsyncAllowance ] = useState<AsyncBigNumber>(IdleData)
    const [ asyncBorrowBalance, setAsyncBorrowBalance ] = useState<AsyncBigNumber>(IdleData)
    const [ action, setAction ] = useState<ActionType>()

    const { isSuccess: isBalance, data: balance } = asyncBalance
    const { isSuccess: isAllowance, data: allowance } = asyncAllowance
    const { isSuccess: isBorrowBalance, data: borrowBalance } = asyncBorrowBalance
    
    const { currentChainId: chainId } = useCurrentChain()
    const { address: account } = useCurrentAccount()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const erc20service  = useErc20Service({ token, publicClient, walletClient, account })
    const supplyService = useSupplyService({ publicClient, walletClient, account, comet })
    const positionsService = usePositionsService({ comet, publicClient })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(REPAY_ERC20_TOKEN_MODAL)

    const { 
      isLoading: isWaitingApproval, 
      isSuccess: isSuccessApproval 
    } = useWaitForTransaction({ hash: approvalHash })

    useEffect(() => {
      if (!isBalance || !isAllowance || !isBorrowBalance) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else if (amount.isGreaterThan(allowance)) {
        setMode(Mode.InsufficientAllowance)
      } else if (amount.isGreaterThan(borrowBalance)) {
        setMode(Mode.ExceedMaximumRepayment)
      } else {
        setMode(Mode.RepaymentReady)
      }
    }, [amount, balance, allowance, borrowBalance])

    useEffect(() => { 
      if (isWaitingApproval) {
        setMode(Mode.WaitingForApproval)
      } 
    }, [isWaitingApproval])

    useEffect(() => { 
      if (isSuccessApproval) {
        const allowance = amountToApprove()
        setAsyncAllowance(SuccessData(allowance))
      } 
    }, [isSuccessApproval])

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

    useEffect(() => {
      if (mode === Mode.Init && erc20service) {
        loadTokenBalance()
        loadTokenAllowance()
        loadBorrowBalance()
      }
    }, [mode, erc20service])

    useEffect(() => {
      if (mode === Mode.ConfirmationOfRepayment && repayHash) {
        setMode(Mode.WaitingForRepayment)
        const amountCopy = bn(amount)
        const hashCopy = structuredClone(repayHash)
        onRepay({ comet, action, token, amount: amountCopy, hash: hashCopy })
        hideModal(REPAY_ERC20_TOKEN_MODAL)
      }
    }, [mode, repayHash])

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
      setAsyncBorrowBalance(IdleData)
      setAsyncAllowance(IdleData)
      setApprovalHash(null)
      setRepayHash(null)
      setAction(null)
    }

    function loadBorrowBalance() {
      const promise = positionsService.borrowBalanceOf(account)
      loadAsyncData(promise, setAsyncBorrowBalance)
    }
    
    function loadTokenBalance() {
      const promise = erc20service.balanceOf(account)
      loadAsyncData(promise, setAsyncBalance)
    }

    function loadTokenAllowance() {
      const promise = erc20service.allowance(account, comet)
      loadAsyncData(promise, setAsyncAllowance)
    }
    
    function setInput(amount: BigNumber) {
      fillInput({ amount, token, id: css['repay-input'] })
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    async function handleRepay() {
      setMode(Mode.ConfirmationOfRepayment)
      const estimedAccruedBorrowBalance = borrowBalance.times(ACCRUED_ESTIMATION).dp(token.decimals)
      const isMaxed = amount.isEqualTo(borrowBalance)
      const isEnoughAllowance = estimedAccruedBorrowBalance.isLessThanOrEqualTo(allowance)
      const isEnoughBalance = estimedAccruedBorrowBalance.isLessThanOrEqualTo(balance)
      console.log('isMaxed', isMaxed, amount.toFixed(), borrowBalance.toFixed())
      console.log('isEnoughAllowance', isEnoughAllowance, estimedAccruedBorrowBalance.toFixed(), allowance.toFixed())
      console.log('isEnoughBalance', isEnoughBalance, estimedAccruedBorrowBalance.toFixed(), balance.toFixed())
      let maxRepayRequest = null
      if (isMaxed && isEnoughAllowance && isEnoughBalance) {
        const [ isSuccess, data ] = await supplyService.simulateSupplyErc20Token({ token, amount, maxed: true })
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
        supplyPromise = supplyService.supplyErc20Token({ token, amount })
      }
      supplyPromise.then(setRepayHash)
    }

    function handleApproval() {
      setMode(Mode.ConfirmationOfApproval)
      const allowance = amountToApprove()
      erc20service.approve(comet, allowance).then(setApprovalHash)
    }

  function amountToApprove() {
    return amount.isEqualTo(borrowBalance) ? borrowBalance.times(ACCRUED_ESTIMATION) : amount
  }

    function handleWalletBalancePercent(factor: number) {
      const newAmount = borrowBalance.times(factor).dp(token.decimals)
      setAmount(newAmount)
      setInput(newAmount)
    }

    return (
      <>
        <div id={REPAY_ERC20_TOKEN_MODAL} className="modal" tabIndex={-1}>
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
                                <TokenIcon symbol={token?.symbol} width={30} />
                                <span className="px-3">{token?.symbol}</span> 
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
                    <WarningMessage>
                      Maximum repayment : <AsyncAmount {...asyncBorrowBalance} />
                    </WarningMessage>
                  ) : mode === Mode.InsufficientBalance ? (
                    <WarningMessage>
                      You don't have enough {token?.symbol} in your wallet
                    </WarningMessage>
                  ) : (
                    <Spacer />
                  )
                }
                <div className="d-grid">
                  { mode === Mode.Init ? (
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                  ) : mode === Mode.InsufficientAllowance ? (
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleApproval}>Enable {token?.symbol}</button>
                  ) : mode === Mode.WaitingForApproval ? (
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Enabling {token?.symbol} ... Wait please <SmallSpinner /></button>
                  ) : [Mode.ConfirmationOfApproval, Mode.ConfirmationOfRepayment].includes(mode) ? (
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
                  ) : mode === Mode.RepaymentReady && amount.isGreaterThan(Zero) ? (
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleRepay}>Repay <Amount value={amount} /> {token?.symbol}</button>
                  ) : (
                    <button className="btn btn-lg btn-primary text-white" type="button">Repay {token?.symbol}</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}



