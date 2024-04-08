import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useBootstrap, useModalEvent } from '../../../hooks/useBootstrap'
import { Zero, bn, bnf } from '../../../utils/bn'
import AmountInput from '../../AmountInput'
import AmountPercent from '../../AmountPercent'
import { SmallSpinner } from '../../Spinner'
import TokenIcon from '../../TokenIcon'
import css from '../../../styles/components/borrow/RepayErc20.module.scss'
import PriceFromFeed from '../../PriceFromFeed'
import { useCurrentChain } from '../../../hooks/useCurrentChain'
import { useCurrentAccount } from '../../../hooks/useCurrentAccount'
import { usePublicClient, useWaitForTransaction, useWalletClient } from 'wagmi'
import { useErc20Service } from '../../../hooks/useErc20Service'
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../../utils/async'
import AsyncAmount from '../../AmountAsync'
import { Hash } from 'viem'
import Amount, { AMOUNT_DP } from '../../Amount'
import { useSupplyService } from '../../../hooks/useSupplyService'
import { ActionType } from '../../../types'
import { REPAY_RESULT_TOAST } from './BorrowPositions'

const enum Mode {
  Init,
  InsufficientBalance,
  InsufficientAllowance,
  ConfirmationOfApproval,
  WaitingForApproval,
  RepayReady,
  ConfirmationOfRepay,
  WaitingForRepay,
}

export const REPAY_ERC20_TOKEN_MODAL = 'repay-erc20-modal'

export default function RepayErc20Token({ comet, token, onRepay }) {
    
    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ approvalHash, setApprovalHash ] = useState<Hash>()
    const [ repayHash, setRepayHash ] = useState<Hash>()
    const [ asyncAllowance, setAsyncAllowance ] = useState<AsyncBigNumber>(IdleData)
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)

    const { isSuccess: isAllowance, data: allowance } = asyncAllowance
    const { isSuccess: isBalance, data: balance } = asyncBalance
    
    const { currentChainId: chainId } = useCurrentChain()
    const { address: account } = useCurrentAccount()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const erc20service  = useErc20Service({ token, publicClient, walletClient, account })
    const supplyService = useSupplyService({ publicClient, walletClient, account, comet })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(REPAY_ERC20_TOKEN_MODAL)

    const { 
      isLoading: isWaitingApproval, 
      isSuccess: isSuccessApproval 
    } = useWaitForTransaction({ hash: approvalHash })

    useEffect(() => {
      if (!isBalance || !isAllowance) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else if (amount.isGreaterThan(allowance)) {
        setMode(Mode.InsufficientAllowance)
      } else {
        setMode(Mode.RepayReady)
      }
    }, [amount, balance, allowance])

    useEffect(() => { 
      if (isWaitingApproval) {
        setMode(Mode.WaitingForApproval)
      } 
    }, [isWaitingApproval])

    useEffect(() => { 
      if (isSuccessApproval) {
        loadAllowance()
      } 
    }, [isSuccessApproval])

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

    useEffect(() => {
      if (mode === Mode.Init && erc20service) {
        loadBalance()
        loadAllowance()
      }
    }, [mode, erc20service])

    useEffect(() => {
      if (mode === Mode.ConfirmationOfRepay && repayHash) {
        setMode(Mode.WaitingForRepay)
        const action = ActionType.Repay
        const hash = structuredClone(repayHash)
        onRepay({ action, token, amount, hash })
        hideModal(REPAY_ERC20_TOKEN_MODAL)
      }
    }, [mode, repayHash])

    function onOpen() {
      setMode(Mode.Init)
    }

    function onHide() {
      if (mode === Mode.WaitingForRepay) {
        openToast(REPAY_RESULT_TOAST)
      }
      setMode(null)
      setAmount(Zero)
      setAsyncBalance(IdleData)
      setAsyncAllowance(IdleData)
      setApprovalHash(null)
      setRepayHash(null)
    }

    function loadBalance() {
      const promise = erc20service.balanceOf(account)
      loadAsyncData(promise, setAsyncBalance)
    }

    function loadAllowance() {
      const promise = erc20service.allowance(account, comet)
      loadAsyncData(promise, setAsyncAllowance)
    }
    
    function setInput(value: string) {
      const elem = document.getElementById(css['repay-input']) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleRepay() {
      setMode(Mode.ConfirmationOfRepay)
      supplyService.supplyErc20Token({ token, amount }).then(setRepayHash)
    }

    function handleApproval() {
      setMode(Mode.ConfirmationOfApproval)
      erc20service.approve(comet, balance).then(setApprovalHash)
    }

    function handleWalletBalancePercent(factor: number) {
      const newAmount = balance.times(factor)
      const newInput = bnf(newAmount, AMOUNT_DP)
      setAmount(newAmount)
      setInput(newInput)
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
                          disabled={Mode.Init === mode} 
                          focused={false} />
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
                          Wallet : <span className="text-body-tertiary"><AsyncAmount {...asyncBalance} /></span>
                        </div>
                      </div>
                  </div>
                  <div className="row g-2">
                    <AmountPercent handler={handleWalletBalancePercent} />
                  </div>
                </div>
                <div className="d-grid">
                  { mode === Mode.Init &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                  }
                  { mode === Mode.InsufficientBalance &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Insufficient {token?.symbol} Balance</button>
                  }
                  { mode === Mode.InsufficientAllowance &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleApproval}>Enable {token?.symbol}</button>
                  }
                  { mode === Mode.WaitingForApproval &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Enabling {token?.symbol} ... Wait please <SmallSpinner /></button>
                  }
                  { [Mode.ConfirmationOfApproval, Mode.ConfirmationOfRepay].includes(mode) &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
                  }
                  { mode === Mode.RepayReady &&
                    <>
                      { amount.isGreaterThan(Zero) ? (
                        <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleRepay}>Repay <Amount value={amount} /> {token?.symbol}</button>
                      ) : (
                        <button className="btn btn-lg btn-primary text-white" type="button">Repay {token?.symbol}</button>
                      )
                      }
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}



