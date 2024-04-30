import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { Hash } from 'viem'
import { usePublicClient, useWaitForTransaction, useWalletClient } from 'wagmi'
import { ModalEvent, useBootstrap, useModalEvent } from '../../../hooks/useBootstrap'
import { useCurrentAccount } from '../../../hooks/useCurrentAccount'
import { useCurrentChain } from '../../../hooks/useCurrentChain'
import { useErc20Service } from '../../../hooks/useErc20Service'
import { useSupplyService } from '../../../hooks/useSupplyService'
import { Zero, bn } from '../../../utils/bn'
import Amount from '../../Amount'
import AmountInput from '../../AmountInput'
import AmountPercent, { fillInput } from '../../AmountPercent'
import { SmallSpinner } from '../../Spinner'
import TokenIcon from '../../TokenIcon'
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../../utils/async'
import css from '../../../styles/components/collaterals/DepositCollateralErc20.module.scss'
import AsyncAmount from '../../AmountAsync'
import { ActionType, DepositParam } from '../../../types'
import PriceFromFeed from '../../PriceFromFeed'
import { ACTION_RESULT_TOAST } from '../../action-result/ActionResult'
import Spacer from '../../Spacer'
import WarningMessage from '../../WarningMessage'

const enum Mode {
  NotConnected,
  Init,
  InsufficientBalance,
  InsufficientAllowance,
  ConfirmationOfApproval,
  WaitingForApproval,
  DepositReady,
  ConfirmationOfDeposit,
  WaitingForDeposit,
}

export const DEPOSIT_COLLATERAL_ERC20_MODAL = 'deposit-collat-erc20-modal'

export default function DepositCollateralErc20({ comet, token, onDeposit } : DepositParam) {
    
    const [ mode, setMode ] = useState<Mode>()

    const [ asyncAllowance, setAsyncAllowance ] = useState<AsyncBigNumber>(IdleData)
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)

    const { isSuccess: isAllowance, data: allowance } = asyncAllowance
    const { isSuccess: isBalance, data: balance } = asyncBalance

    const [ amount, setAmount ] = useState<BigNumber>(Zero)

    const [ approvalHash, setApprovalHash ] = useState<Hash>()
    const [ supplyHash, setSupplyHash ] = useState<Hash>()

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const erc20service  = useErc20Service({ token, publicClient, walletClient, account })
    const supplyService = useSupplyService({ publicClient, walletClient, account, comet })

    const { 
      isLoading: isWaitingApproval, 
      isSuccess: isSuccessApproval 
    } = useWaitForTransaction({ hash: approvalHash })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(DEPOSIT_COLLATERAL_ERC20_MODAL)

    useEffect(() => {
      if (!isConnected || !isBalance || !isAllowance) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else if (amount.isGreaterThan(allowance)) {
        setMode(Mode.InsufficientAllowance)
      } else {
        setMode(Mode.DepositReady)
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
      if (mode === Mode.Init && erc20service) {
        loadBalance()
        loadAllowance()
      }
    }, [mode, erc20service])
    
    useEffect(() => {
      if (mode === Mode.ConfirmationOfDeposit && supplyHash) {
        setMode(Mode.WaitingForDeposit)
        const action = ActionType.DepositCollateral
        const amountCopy = bn(amount)
        const hashCopy = structuredClone(supplyHash)
        onDeposit({ comet, action, token, amount: amountCopy, hash: hashCopy })
        hideModal(DEPOSIT_COLLATERAL_ERC20_MODAL)
      }
    }, [mode, supplyHash])

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
      if (mode === Mode.WaitingForDeposit) {
        openToast(ACTION_RESULT_TOAST)
      }
      resetState()
    }
    
    function resetState() {
      setAmount(Zero)
      setMode(null)
      setInput(null)
      setApprovalHash(null)
      setAsyncBalance(IdleData)
      setAsyncAllowance(IdleData)
      setSupplyHash(null)
    }

    function setInput(amount: BigNumber) {
      fillInput({ amount, token, id: css['deposit-input'] })
    }

    function loadBalance() {
      const promise = erc20service.balanceOf(account)
      loadAsyncData(promise, setAsyncBalance)
    }

    function loadAllowance() {
      const promise = erc20service.allowance(account, comet)
      loadAsyncData(promise, setAsyncAllowance)
    }
    
    function handleApproval() {
      setMode(Mode.ConfirmationOfApproval)
      erc20service.approve(comet, amount).then(setApprovalHash)
    }

    function handleDeposit() {
      setMode(Mode.ConfirmationOfDeposit)
      supplyService.supplyErc20Token({ token, amount }).then(setSupplyHash)
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleWalletBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor).dp(token.decimals)
      setAmount(newAmount)
      setInput(newAmount)
    }

    return (
        <div id={DEPOSIT_COLLATERAL_ERC20_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['deposit-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Deposit</h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['deposit-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                        <AmountInput 
                          id={css['deposit-input']} 
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
                          Wallet : <span className="text-body-tertiary"><AsyncAmount { ...{ ...asyncBalance, idleData: '0'} } /></span>
                        </div>
                      </div>
                  </div>
                  <div className="row g-2">
                    <AmountPercent handler={handleWalletBalancePercent} />
                  </div>
                </div>
                { mode === Mode.InsufficientBalance ? (
                    <WarningMessage>
                      Insufficient {token?.symbol} Balance
                    </WarningMessage>
                  ) : (
                    <Spacer />
                  )
                }
                <div className="d-grid">
                  { mode === Mode.Init &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                  }
                  { mode === Mode.NotConnected &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Connect Wallet</button>
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
                  { ([Mode.ConfirmationOfApproval, Mode.ConfirmationOfDeposit].includes(mode)) &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
                  }
                  { mode === Mode.DepositReady &&
                    <>
                      { amount.isGreaterThan(Zero) ? (
                          <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleDeposit}>Deposit <Amount value={amount} /> {token?.symbol}</button>
                        ) : (
                          <button className="btn btn-lg btn-primary text-white" type="button">Deposit {token?.symbol}</button>
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



