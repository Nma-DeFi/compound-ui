import { useCurrentChain } from '../../hooks/useCurrentChain'
import css from '../../styles/components/farm/DepositErc20.module.scss'
import { useState, useEffect } from 'react'
import { useCurrentAccount } from '../../hooks/useCurrentAccount'
import BigNumber from 'bignumber.js'
import { Zero, bn, bnf } from '../../utils/bn'
import * as MarketSelector from "../../selectors/market-selector"
import { useErc20Service } from '../../hooks/useErc20Service'
import { SmallSpinner } from '../Spinner'
import { useSupplyService } from '../../hooks/useSupplyService'
import { useBootstrap, useModalEvent } from '../../hooks/useBootstrap'
import { usePublicClient, useWaitForTransaction, useWalletClient } from 'wagmi'
import { Hash } from 'viem'
import { usePrice } from '../../hooks/usePrice'
import Result from './Result'
import AmountInput from '../AmountInput'
import { Action, ActionInfo } from '../../pages/farm'
import AmountPercent from '../AmountPercent'

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

export default function DepositErc20Token(market) {

    const AMOUNT_PRECISION = 4
    
    const [ mode, setMode ] = useState<number>()
    const [ balance, setBalance ] = useState<BigNumber>()
    const [ allowance, setAllowance ] = useState<BigNumber>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)

    const [ approvalHash, setApprovalHash ] = useState<Hash>()
    const [ supplyHash, setSupplyHash ] = useState<Hash>()
    const [ supplyInfo, setSupplyInfo ] = useState<ActionInfo>()

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const comet = MarketSelector.cometProxy(market)
    const baseToken = MarketSelector.baseToken(market)
    
    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()

    const { isSuccess: isPrice, data: price } = usePrice({ token: baseToken })

    const baseTokenErc20  = useErc20Service({ token: baseToken, publicClient, walletClient, account })

    const supplyService = useSupplyService({ publicClient, walletClient, account, comet })

    const { 
      isLoading: isWaitingApproval, 
      isSuccess: isSuccessApproval 
    } = useWaitForTransaction({ hash: approvalHash })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(DEPOSIT_ERC20_TOKEN_MODAL)

    useEffect(() => {
      if (!isConnected || !balance || !allowance) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else if (amount.isGreaterThan(allowance)) {
        setMode(Mode.InsufficientAllowance)
      } else {
        setMode(Mode.DepositReady)
      }
    }, [balance, allowance, amount])

    useEffect(() => { 
      if (isWaitingApproval) {
        setMode(Mode.WaitingForApproval)
      } 
    }, [isWaitingApproval])

    useEffect(() => { 
      if (isSuccessApproval) {
        baseTokenErc20.allowance(account, comet).then(setAllowance)
      } 
    }, [isSuccessApproval])

    useEffect(() => {
      if (mode === Mode.Init && baseTokenErc20) {
          baseTokenErc20.balanceOf(account).then(setBalance)
          baseTokenErc20.allowance(account, comet).then(setAllowance)
      }
    }, [baseTokenErc20])
    
    useEffect(() => {
      if (supplyHash && mode === Mode.ConfirmationOfDeposit) {
        setMode(Mode.WaitingForDeposit)
        setSupplyInfo({ action: Action.Deposit, token: baseToken, amount, hash: supplyHash })
        hideModal(DEPOSIT_ERC20_TOKEN_MODAL)
      }
    }, [supplyHash])

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
      if (mode === Mode.WaitingForDeposit) {
        openToast(DEPOSIT_ERC20_TOKEN_TOAST)
      }
      setMode(null)
    }
    
    function initState() {
      setAmount(Zero)
      setInput(null)
      setBalance(null)
      setAllowance(null)
      setApprovalHash(null)
      setSupplyHash(null)
      setSupplyInfo(null)
    }

    function setInput(value: string) {
      const elem = document.getElementById(css['deposit-input']) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
    }

    function handleApproval() {
      setMode(Mode.ConfirmationOfApproval)
      baseTokenErc20.approve(comet, balance).then(setApprovalHash)
    }

    function handleDeposit() {
      if (amount.isZero()) return
      setMode(Mode.ConfirmationOfDeposit)
      supplyService.supplyErc20Token({ token: baseToken, amount }).then(setSupplyHash)
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleWalletBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor)
      const newInput = bnf(newAmount, AMOUNT_PRECISION)
      setAmount(newAmount)
      setInput(newInput)
    }

    return (
      <>
        <Result {...{id: DEPOSIT_ERC20_TOKEN_TOAST, ...supplyInfo}} />
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
                          focused={[Mode.NotConnected, Mode.DepositReady].includes(mode)} />
                        <div className="small text-body-tertiary">
                        ${ bnf(amount && isPrice ? amount.times(price) : 0) }
                        </div>
                      </div>
                      <div>
                          <button type="button" className="btn btn-light border border-light-subtle rounded-4 mb-2">
                              <div className="d-flex align-items-center">
                                  <img src={`/images/tokens/${baseToken?.symbol}.svg`} alt="USDC" width="30" /> 
                                  <span className="px-3">{baseToken?.symbol}</span> 
                              </div>
                          </button>
                          <div className="text-center text-body-secondary small">
                            Wallet : <span className="text-body-tertiary">{ bnf(balance || 0, AMOUNT_PRECISION) }</span>
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
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Insufficient {baseToken?.symbol} Balance</button>
                  }
                  { mode === Mode.InsufficientAllowance &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleApproval}>Enable {baseToken?.symbol}</button>
                  }
                  { mode === Mode.WaitingForApproval &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Enabling {baseToken?.symbol} ... Wait please <SmallSpinner /></button>
                  }
                  { mode === Mode.DepositReady &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleDeposit}>Deposit {baseToken?.symbol}</button>
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



