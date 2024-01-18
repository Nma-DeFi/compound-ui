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

export const DEPOSIT_MODAL = 'deposit'

export const Mode = {
  NotConnected: 0,
  Init: 1,
  InsufficientBalance: 2,
  InsufficientAllowance: 3,
  ConfirmationOfApproval: 4,
  WaitingForApproval: 5,
  DepositReady: 6,
  ConfirmationOfDeposit: 7
}

export default function Deposit(market) {
    
    const [ mode, setMode ] = useState<number | null>(null)
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ balance, setBalance ] = useState<BigNumber>(null)
    const [ allowance, setAllowance ] = useState<BigNumber>(null)
    const [ modalOpened, setModalOpened ] = useState<boolean>(false)

    const [ approvalHash, setApprovalHash ] = useState(null)
    const { 
      isLoading: isWaitingApproval, 
      isSuccess: isSuccessApproval 
    } = useWaitForTransaction({ hash: approvalHash })

    const inputRef = useRef(null)

    const { isConnected, address: account } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const comet = cometProxy(market)
    const token = baseToken(market)

    const { 
      balanceOf: tokenBalance, 
      allowance: tokenAllowance,
      approve: tokenApprove,
    }  = useErc20({ chainId, account, token })

    const { supply } = useSupply({ chainId, account, comet })

    const { hideModal } = useBootstrap()

    useEffect(() => {
      const modal = document.getElementById(DEPOSIT_MODAL)
      modal.addEventListener('show.bs.modal', () => setModalOpened(true))
      modal.addEventListener('hide.bs.modal', () => setModalOpened(false))
    }, [])

    useEffect(() => { 
      if (isWaitingApproval) {
        console.log('isWaitingApproval')
        setMode(Mode.WaitingForApproval)
      } 
      if (isSuccessApproval) {
        console.log('isSuccessApproval')
        tokenAllowance(account, comet).then(allowance=> {
          console.log('Approve new allowance', allowance.toFixed())
          setAllowance(allowance)
        })
      } 
    }, [isWaitingApproval, isSuccessApproval])

    function isInsufficientBalance() {
      console.log('isInsufficientBalance', 'amount', amount.toFixed(), 'balance', balance.toFixed())
      console.log('isInsufficientBalance', amount.isGreaterThan(balance))
      return amount.isGreaterThan(balance)
    }

    function isInsufficientAllowance() {
      console.log('isInsufficientAllowance', 'amount', amount.toFixed(), 'allowance', allowance.toFixed())
      console.log('isInsufficientAllowance', amount.isGreaterThan(allowance))
      return amount.isGreaterThan(allowance)
    }

    useEffect(() => {
      console.log('processMode')
      if (!balance || !allowance) return
      if (!mode || mode === Mode.NotConnected) return

      if (isInsufficientBalance()) {
        setMode(Mode.InsufficientBalance)
      } else if (isInsufficientAllowance()) {
        setMode(Mode.InsufficientAllowance)
      } else {
        setMode(Mode.DepositReady)
      }
    }, [balance, allowance, amount])
    
    useEffect(() => {
      if (mode === Mode.DepositReady) {
        inputRef.current.focus()
      } 
    }, [mode])

    useEffect(() => {
      if (modalOpened) {
        onOpen()
      } else {
        onHide()
      }
    }, [modalOpened])

    function onOpen() {
      setAmount(Zero)
      setBalance(null)
      setAllowance(null)
      setApprovalHash(null)
      
      if (!isConnected) {
        setMode(Mode.NotConnected)
      } else {
        setMode(Mode.Init)
        tokenBalance(account).then(setBalance)
        tokenAllowance(account, comet).then(setAllowance)
      }
    }

    function onHide() {
      inputRef.current.value= ''
    }

    function onAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    async function handleApproval() {
      console.log('handleApproval')
      setMode(Mode.ConfirmationOfApproval)
      const hash = await tokenApprove(comet, amount)
      console.log('Approve hash', hash)
      setApprovalHash(hash)
    }

    async function handleDeposit() {
      console.log('handleDeposit')
      if (amount.isZero()) return
      setMode(Mode.ConfirmationOfDeposit)
      const hash = await supply({ token, amount })
      console.log('Supply hash', hash)
      hideModal(DEPOSIT_MODAL)
    }


    return (
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
                        <input id={css['deposit-input']} ref={inputRef} type="number" autoComplete="off" 
                          placeholder="0" min="0" step="any" onChange={onAmountChange} disabled={mode === Mode.Init}/>
                        <div className="small text-body-tertiary">$0.00</div>
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
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100">25%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100">50%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100">75%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100">Max</button></div>
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
    )
}

