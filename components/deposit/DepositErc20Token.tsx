import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { Hash } from 'viem'
import { usePublicClient, useWaitForTransaction, useWalletClient } from 'wagmi'
import { useBootstrap, useModalEvent } from '../../hooks/useBootstrap'
import { useCurrentAccount } from '../../hooks/useCurrentAccount'
import { useCurrentChain } from '../../hooks/useCurrentChain'
import { useErc20Service } from '../../hooks/useErc20Service'
import { useSupplyService } from '../../hooks/useSupplyService'
import { Zero, bn, bnf } from '../../utils/bn'
import { AMOUNT_DP } from '../Amount'
import AmountInput from '../AmountInput'
import AmountPercent from '../AmountPercent'
import { SmallSpinner } from '../Spinner'
import ActionResult from '../action-result/ActionResult'
import TokenIcon from '../TokenIcon'
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../utils/async'
import css from '../../styles/components/farm/DepositErc20.module.scss'
import AsyncAmount from '../AmountAsync'
import { ActionInfo, DepositParam } from '../../types'
import PriceFromFeed from '../PriceFromFeed'

const Mode = {
  NotConnected: 0,
  Init: 1,
  InsufficientBalance: 2,
  InsufficientAllowance: 3,
  ConfirmationOfApproval: 4,
  WaitingForApproval: 5,
  DepositReady: 6,
  ConfirmationOfDeposit: 7,
  WaitingForDeposit: 8,
}

export const DEPOSIT_ERC20_TOKEN_MODAL = 'deposit-erc20-modal'
export const DEPOSIT_ERC20_TOKEN_TOAST = 'deposit-erc20-toast'

export default function DepositErc20Token({ comet, token, depositType } : DepositParam) {
    
    const [ mode, setMode ] = useState<number>()

    const [ asyncAllowance, setAsyncAllowance ] = useState<AsyncBigNumber>(IdleData)
    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)

    const { isSuccess: isAllowance, data: allowance } = asyncAllowance
    const { isSuccess: isBalance, data: balance } = asyncBalance

    const [ amount, setAmount ] = useState<BigNumber>(Zero)

    const [ approvalHash, setApprovalHash ] = useState<Hash>()
    const [ supplyHash, setSupplyHash ] = useState<Hash>()
    const [ supplyInfo, setSupplyInfo ] = useState<ActionInfo>()

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
    const modalEvent = useModalEvent(DEPOSIT_ERC20_TOKEN_MODAL)

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
        setSupplyInfo({ action: depositType, token, amount, hash: supplyHash })
        hideModal(DEPOSIT_ERC20_TOKEN_MODAL)
      }
    }, [mode, supplyHash])

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
      let clearSupplyData = true
      if (mode === Mode.WaitingForDeposit) {
        openToast(DEPOSIT_ERC20_TOKEN_TOAST)
        clearSupplyData = false
      }
      initState(clearSupplyData)
    }
    
    function initState(initSupplyData = true) {
      setAmount(Zero)
      setMode(null)
      setInput(null)
      setApprovalHash(null)
      setAsyncBalance(IdleData)
      setAsyncAllowance(IdleData)
      if (initSupplyData) {
        setSupplyHash(null)
        setSupplyInfo(null)
      }
    }

    function setInput(value: string) {
      const elem = document.getElementById(css['deposit-input']) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
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
      erc20service.approve(comet, balance).then(setApprovalHash)
    }

    function handleDeposit() {
      if (amount.isGreaterThan(Zero)) {
        setMode(Mode.ConfirmationOfDeposit)
        supplyService.supplyErc20Token({ token, amount }).then(setSupplyHash)
      }
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleWalletBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor)
      const newInput = bnf(newAmount, AMOUNT_DP)
      setAmount(newAmount)
      setInput(newInput)
    }

    return (
      <>
        <ActionResult {...{id: DEPOSIT_ERC20_TOKEN_TOAST, ...supplyInfo}} />
        <div id={DEPOSIT_ERC20_TOKEN_MODAL} className="modal" tabIndex={-1}>
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
                  { mode === Mode.NotConnected &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Connect your wallet</button>
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
                  { mode === Mode.DepositReady &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleDeposit}>Deposit {token?.symbol}</button>
                  }
                  { ([Mode.ConfirmationOfApproval, Mode.ConfirmationOfDeposit].includes(mode)) &&
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



