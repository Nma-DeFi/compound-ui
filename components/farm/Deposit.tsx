import { useCurrentChain } from '../../hooks/useCurrentChain'
import css from '../../styles/components/farm/Deposit.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useCurrentAccount } from '../../hooks/useCurrentAccount'
import BigNumber from 'bignumber.js'
import { Zero, bn, bnf } from '../../utils/bn'
import { baseToken, cometProxy } from '../../services/market-info-service'
import { useErc20 } from '../../hooks/useErc20'
import { SmallSpinner } from '../Spinner'
import { useSupply } from '../../hooks/useSupply'
import { useBootstrap } from '../../hooks/useBootstrap'
import { useWaitForTransaction } from 'wagmi'
import { Hash } from 'viem'
import { usePrice } from '../../hooks/usePrice'
import ResultToast, { RESULT_TOAST } from './ResultToast'
import { openToast } from '../../utils/bootstrap'

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
    const [ modalOpened, setModalOpened ] = useState<boolean>()

    const [ approvalHash, setApprovalHash ] = useState<Hash>()
    const [ supplyHash, setSupplyHash ] = useState<Hash>()
    const [ supplyInfo, setSupplyInfo ] = useState(null)

    const modalRef = useRef(null)
    const inputRef = useRef(null)

    const { isConnected, address: account } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const comet = cometProxy(market)
    const token = baseToken(market)

    const { 
      isSuccess: isSuccessPrice, 
      data: price 
    } = usePrice({ token })

    const { 
      balanceOf: tokenBalance, 
      allowance: tokenAllowance,
      approve: tokenApprove,
    }  = useErc20({ chainId, account, token })

    const { 
      isLoading: isWaitingApproval, 
      isSuccess: isSuccessApproval 
    } = useWaitForTransaction({ hash: approvalHash })

    const { supply } = useSupply({ chainId, account, comet })

    const { hideModal } = useBootstrap()

    useEffect(() => {
      modalRef.current.addEventListener('show.bs.modal', () => setModalOpened(true))
      modalRef.current.addEventListener('hide.bs.modal', () => setModalOpened(false))
    }, [])

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
      if ([Mode.NotConnected, Mode.DepositReady].includes(mode)) {
        inputRef.current.focus()
      } 
    }, [mode])

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
        setSupplyInfo({ token, amount, hash: supplyHash })
        hideModal(DEPOSIT_MODAL)
        openToast(RESULT_TOAST)
      }
    }, [supplyHash])

    useEffect(() => {
      if (modalOpened) {
        onOpen()
      } else {
        onHide()
      }
    }, [modalOpened])

    function onOpen() {
      initStates()
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
      inputRef.current.value= ''
    }
    
    function initStates() {
      setAmount(Zero)
      setBalance(null)
      setAllowance(null)
      setApprovalHash(null)
      setSupplyHash(null)
      setSupplyInfo(null)
    }

    function onAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleApproval() {
      setMode(Mode.ConfirmationOfApproval)
      tokenApprove(comet, balance).then(setApprovalHash)
    }

    function handleDeposit() {
      if (amount.isZero()) return
      setMode(Mode.ConfirmationOfDeposit)
      supply({ token, amount }).then(setSupplyHash)
    }

    function handleAmountPercentage(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor)
      setAmount(newAmount)
      inputRef.current.value = bnf(newAmount)
    }

    return (
      <>
        <ResultToast {...supplyInfo} />
        <div id={DEPOSIT_MODAL} ref={modalRef} className="modal" tabIndex={-1}>
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
                        <input id={css['deposit-input']} ref={inputRef} type="number" autoComplete="off" 
                          placeholder="0" min="0" step="any" onChange={onAmountChange} disabled={mode === Mode.Init}/>
                        <div className="small text-body-tertiary">
                        ${ bnf(amount && isSuccessPrice ? amount.times(price) : 0) }
                        </div>
                      </div>
                      <div>
                          <button type="button" className="btn btn-light border border-light-subtle rounded-4 mb-2">
                              <div className="d-flex align-items-center">
                                  <img src={`/images/tokens/${token?.symbol}.svg`} alt="USDC" width="30" /> 
                                  <span className="px-3">{token?.symbol}</span> 
                              </div>
                          </button>
                          <div className="text-center text-body-secondary small">
                            Wallet : <span className="text-body-tertiary">{ bnf(balance || 0) }</span>
                          </div>
                      </div>
                  </div>
                  <div className="row g-2">
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handleAmountPercentage(0.25)}>25%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handleAmountPercentage(0.5)}>50%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handleAmountPercentage(0.75)}>75%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handleAmountPercentage(1)}>Max</button></div>
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
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Enabling {token?.symbol} <SmallSpinner /></button>
                  }
                  { mode === Mode.DepositReady &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleDeposit}>Deposit {token?.symbol}</button>
                  }
                  { (mode === Mode.ConfirmationOfApproval || mode === Mode.ConfirmationOfDeposit) &&
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

