import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { Hash } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'
import { useBootstrap, useModalEvent } from '../../hooks/useBootstrap'
import { useCurrentAccount } from '../../hooks/useCurrentAccount'
import { useCurrentChain } from '../../hooks/useCurrentChain'
import { usePrice } from '../../hooks/usePrice'
import { useSupplyService } from '../../hooks/useSupplyService'
import { Action, ActionInfo } from '../../pages/farm'
import * as MarketSelector from "../../selectors/market-selector"
import css from '../../styles/components/farm/DepositNative.module.scss'
import { Zero, bn, bnf, fromBigInt } from '../../utils/bn'
import * as ChainUtils from '../../utils/chains'
import AmountInput from '../AmountInput'
import AmountPercent from '../AmountPercent'
import { SmallSpinner } from '../Spinner'
import Result from './Result'

const Mode = {
  NotConnected: 0,
  Init: 1,
  InsufficientBalance: 2,
  DepositReady: 3,
  ConfirmationOfDeposit: 4,
  WaitingForDeposit: 5,
}

export const DEPOSIT_NATIVE_CURRENCY_MODAL = 'deposit-native-modal'
export const DEPOSIT_NATIVE_CURRENCY_TOAST = 'deposit-native-toast'

export default function DepositNativeCurrency(market) {

    const AMOUNT_PRECISION = 4

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })

    const [ mode, setMode ] = useState<number>()
    const [ balance, setBalance ] = useState<BigNumber>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ supplyHash, setSupplyHash ] = useState<Hash>()
    const [ supplyInfo, setSupplyInfo ] = useState<ActionInfo>()

    const { isConnected, address } = useCurrentAccount()

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(DEPOSIT_NATIVE_CURRENCY_MODAL)

    const { data: walletClient } = useWalletClient()

    const comet = MarketSelector.cometProxy(market)
    const nativeCurrency = ChainUtils.nativeCurrency(chainId)

    const { isSuccess: isPrice, data: price } = usePrice({ token: nativeCurrency })

    const supplyService = useSupplyService({ publicClient, walletClient, account: address, comet })

    useEffect(() => {
      if (!isConnected || !balance) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else {
        setMode(Mode.DepositReady)
      }
    }, [amount, balance])

        
    useEffect(() => {
      if (supplyHash && mode === Mode.ConfirmationOfDeposit) {
        setMode(Mode.WaitingForDeposit)
        setSupplyInfo({ action: Action.Deposit, hash: supplyHash, token: nativeCurrency, amount })
        hideModal(DEPOSIT_NATIVE_CURRENCY_MODAL)
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
    
    async function onOpen() {
      initState()
      if (!isConnected) {
        setMode(Mode.NotConnected)
      } else {
        setMode(Mode.Init)
        const balance = await publicClient.getBalance({ address })
        setBalance(fromBigInt(balance))
      }
    }

    function onHide() {
      if (mode === Mode.WaitingForDeposit) {
        openToast(DEPOSIT_NATIVE_CURRENCY_TOAST)
      }
      setMode(null)
    }

    function initState() {
      setAmount(Zero)
      setInput(null)
      setBalance(null)
      setSupplyHash(null)
      setSupplyInfo(null)
    }

    function setInput(value: string) {
      const id = css['deposit-native-input']
      const elem = document.getElementById(id) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleDeposit() {
      if (amount.isZero()) return
      setMode(Mode.ConfirmationOfDeposit)
      supplyService.supplyNativeCurrency({ amount }).then(setSupplyHash)
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
        <Result {...{id: DEPOSIT_NATIVE_CURRENCY_TOAST, ...supplyInfo}} />
        <div id={DEPOSIT_NATIVE_CURRENCY_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['deposit-native-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Deposit</h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['deposit-native-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                        <AmountInput 
                          id={css['deposit-native-input']} 
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
                                  <img src={`/images/tokens/${nativeCurrency.symbol}.svg`} alt={nativeCurrency.symbol} width="30" /> 
                                  <span className="px-3">{nativeCurrency.symbol}</span> 
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
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Insufficient {nativeCurrency.symbol} Balance</button>
                  }
                  { mode === Mode.DepositReady &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleDeposit}>Deposit {nativeCurrency.symbol}</button>
                  }
                  { mode === Mode.ConfirmationOfDeposit &&
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



