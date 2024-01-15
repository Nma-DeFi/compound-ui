import { useCurrentChain } from '../../hooks/useCurrentChain'
import css from '../../styles/components/farm/Deposit.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useCurrentAccount } from '../../hooks/useCurrentAccount'
import BigNumber from 'bignumber.js'
import { Zero, bn, bnf } from '../../utils/bn'
import { baseToken, cometProxy } from '../../services/market-info-service'
import { useTokenBalance } from '../../hooks/useTokenBalance'
import { useTokenAllowance } from '../../hooks/useTokenAllowance'

export const DEPOSIT_MODAL = 'deposit'

export const Mode = {
  NotConnected: 'NotConnected',
  Init: 'Init',
  InsufficientBalance: 'InsufficientBalance',
  InsufficientAllowance: 'InsufficientAllowance',
  DepositReady: 'DepositReady',
}

export default function Deposit(market) {
    
    const [ mode, setMode ] = useState<string | null>(null)
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ modalOpened, setModalOpened ] = useState<boolean>(false)

    const inputRef = useRef(null)

    const { isConnected, address } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const comet = cometProxy(market)
    const token = baseToken(market)

    const balance = useTokenBalance({ chainId, token, owner: address })
    const allowance = useTokenAllowance({ chainId, token, owner: address, spender: comet })

    useEffect(() => {
      const modal = document.getElementById(DEPOSIT_MODAL)
      modal.addEventListener('show.bs.modal', () => setModalOpened(true))
      modal.addEventListener('hide.bs.modal', () => setModalOpened(false))
    }, [])

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
      if (mode === Mode.NotConnected) return
      if (amount.isZero()) {
        setMode(Mode.Init)
      } else if (isInsufficientBalance()) {
        setMode(Mode.InsufficientBalance)
      } else if (isInsufficientAllowance()) {
        setMode(Mode.InsufficientAllowance)
      } else {
        setMode(Mode.DepositReady)
      }
    }, [amount])

    useEffect(() => {
      if (modalOpened) {
        onOpen()
      } else {
        onHide()
      }
    }, [modalOpened])

    function onOpen() {
      if (!isConnected) {
        setMode(Mode.NotConnected)
      } else {
        setMode(Mode.Init)
      }
      inputRef.current.focus()
    }

    function onHide() {
      setAmount(Zero)
      inputRef.current.value= ''
    }

    function onAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
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
                          placeholder="0" min="0" step="any" onChange={onAmountChange} />
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
                            Wallet : <span className="text-body-tertiary">${ bnf(balance || 0) }</span>
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
                  { (mode === Mode.Init || mode === Mode.DepositReady) &&
                    <button className="btn btn-lg btn-primary text-white" type="button">Deposit {token?.symbol}</button>
                  }
                  { mode === Mode.NotConnected &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Connect your wallet</button>
                  }
                  { mode === Mode.InsufficientBalance &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Insufficient {token?.symbol} Balance</button>
                  }
                  { mode === Mode.InsufficientAllowance &&
                    <button className="btn btn-lg btn-primary text-white" type="button">Enable {token?.symbol}</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

