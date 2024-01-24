import { useCurrentChain } from '../../hooks/useCurrentChain'
import css from '../../styles/components/farm/Deposit.module.scss'
import { useState, useEffect } from 'react'
import { useCurrentAccount } from '../../hooks/useCurrentAccount'
import BigNumber from 'bignumber.js'
import { Zero, bn, bnf } from '../../utils/bn'
import * as MarketSelector from "../../selectors/market-selector"
import { useErc20 } from '../../hooks/useErc20'
import { SmallSpinner } from '../Spinner'
import { useSupply } from '../../hooks/useSupply'
import { useBootstrap, useModalEvent } from '../../hooks/useBootstrap'
import { useWaitForTransaction } from 'wagmi'
import { Hash } from 'viem'
import { usePrice } from '../../hooks/usePrice'
import Result, { RESULT_TOAST } from './Result'
import AmountInput from '../AmountInput'

type SupplyInfo = { 
  token: any, 
  amount: BigNumber, 
  hash: Hash, 
}

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

export const DEPOSIT_MODAL = 'deposit'

export default function Deposit(market) {
    
    const [ mode, setMode ] = useState<number>()
    const [ amount, setAmount ] = useState<BigNumber>()
    const [ balance, setBalance ] = useState<BigNumber>()
    const [ allowance, setAllowance ] = useState<BigNumber>()

    const [ approvalHash, setApprovalHash ] = useState<Hash>()
    const [ supplyHash, setSupplyHash ] = useState<Hash>()
    const [ supplyInfo, setSupplyInfo ] = useState<SupplyInfo>()

    const { isConnected, address: account } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const comet = MarketSelector.cometProxy(market)
    const baseToken = MarketSelector.baseToken(market)

    const { 
      isSuccess: isSuccessPrice, 
      data: price 
    } = usePrice({ token: baseToken })

    const { 
      balanceOf: tokenBalance, 
      allowance: tokenAllowance,
      approve: tokenApprove,
    }  = useErc20({ chainId, account, token: baseToken })

    const { supply } = useSupply({ chainId, account, comet })

    const { 
      isLoading: isWaitingApproval, 
      isSuccess: isSuccessApproval 
    } = useWaitForTransaction({ hash: approvalHash })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(DEPOSIT_MODAL)

    useEffect(() => {
      if (!amount || !balance || !allowance) return
      if (!mode || mode === Mode.NotConnected) return

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
      if (isSuccessApproval) {
        tokenAllowance(account, comet).then(setAllowance)
      } 
    }, [isWaitingApproval, isSuccessApproval])
    
    useEffect(() => {
      if (supplyHash && mode === Mode.ConfirmationOfDeposit) {
        setMode(Mode.WaitingForDeposit)
        setSupplyInfo({ token: baseToken, amount, hash: supplyHash })
        hideModal(DEPOSIT_MODAL)
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
        tokenBalance(account).then(setBalance)
        tokenAllowance(account, comet).then(setAllowance)
      }
    }

    function onHide() {
      setMode(null)
      setInput(null)
      if (mode === Mode.WaitingForDeposit) {
        openToast(RESULT_TOAST)
      }
    }
    
    function initState() {
      setAmount(Zero)
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
      tokenApprove(comet, balance).then(setApprovalHash)
    }

    function handleDeposit() {
      if (amount.isZero()) return
      setMode(Mode.ConfirmationOfDeposit)
      supply({ token: baseToken, amount }).then(setSupplyHash)
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleWalletAmountPercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor)
      const newInput = bnf(newAmount)
      setAmount(newAmount)
      setInput(newInput)
    }

    return (
      <>
        <Result {...supplyInfo} />
        <div id={DEPOSIT_MODAL} className="modal" tabIndex={-1}>
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
                        ${ bnf(amount && isSuccessPrice ? amount.times(price) : 0) }
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
                            Wallet : <span className="text-body-tertiary">{ bnf(balance || 0) }</span>
                          </div>
                      </div>
                  </div>
                  <div className="row g-2">
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handleWalletAmountPercent(0.25)}>25%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handleWalletAmountPercent(0.5)}>50%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handleWalletAmountPercent(0.75)}>75%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handleWalletAmountPercent(1)}>Max</button></div>
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
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Enabling {baseToken?.symbol} <SmallSpinner /></button>
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



