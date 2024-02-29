import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { Hash } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'
import { useBootstrap, useModalEvent } from '../../hooks/useBootstrap'
import { useCurrentAccount } from '../../hooks/useCurrentAccount'
import { useCurrentChain } from '../../hooks/useCurrentChain'
import { useSupplyService } from '../../hooks/useSupplyService'
import css from '../../styles/components/farm/DepositNative.module.scss'
import { Zero, bn, bnf, fromBigInt } from '../../utils/bn'
import * as ChainUtils from '../../utils/chains'
import { AMOUNT_DP } from '../Amount'
import AmountInput from '../AmountInput'
import AmountPercent from '../AmountPercent'
import { SmallSpinner } from '../Spinner'
import ActionResult from '../action-result/ActionResult'
import TokenIcon from '../TokenIcon'
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../utils/async'
import AsyncAmount from '../AmountAsync'
import { ActionInfo, DepositParam } from '../../types'
import PriceAsync from '../PriceAsync'

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

export default function DepositNativeCurrency({ comet, token, depositType }  : DepositParam) {

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })

    const [ mode, setMode ] = useState<number>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)

    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)
    const { isSuccess: isBalance, data: balance } = asyncBalance

    const [ supplyHash, setSupplyHash ] = useState<Hash>()
    const [ supplyInfo, setSupplyInfo ] = useState<ActionInfo>()

    const { isConnected, address } = useCurrentAccount()

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(DEPOSIT_NATIVE_CURRENCY_MODAL)

    const { data: walletClient } = useWalletClient()

    const nativeCurrency = ChainUtils.nativeCurrency(chainId)

    const supplyService = useSupplyService({ publicClient, walletClient, account: address, comet })

    useEffect(() => {
      if (!isConnected || !isBalance) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else {
        setMode(Mode.DepositReady)
      }
    }, [amount, balance])
        
    useEffect(() => {
      if (mode === Mode.ConfirmationOfDeposit && supplyHash) {
        setMode(Mode.WaitingForDeposit)
        setSupplyInfo({ action: depositType, hash: supplyHash, token: nativeCurrency, amount })
        hideModal(DEPOSIT_NATIVE_CURRENCY_MODAL)
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
    
    async function onOpen() {
      initState()
      if (!isConnected) {
        setMode(Mode.NotConnected)
      } else {
        setMode(Mode.Init)
        loadBalance()
      }
    }

    function onHide() {
      let clearSupplyData = true
      if (mode === Mode.WaitingForDeposit) {
        openToast(DEPOSIT_NATIVE_CURRENCY_TOAST)
        clearSupplyData = false
      }
      initState(clearSupplyData)
    }

    function initState(initSupplyData = true) {
      setAmount(Zero)
      setMode(null)
      setInput(null)
      setAsyncBalance(IdleData)
      if (initSupplyData) {
        setSupplyHash(null)
        setSupplyInfo(null)
      }
    }
    
    function loadBalance() {
      const promise = publicClient.getBalance({ address }).then(fromBigInt)
      loadAsyncData(promise, setAsyncBalance)
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
      if (amount.isGreaterThan(Zero)) {
        setMode(Mode.ConfirmationOfDeposit)
        supplyService.supplyNativeCurrency({ amount }).then(setSupplyHash)
      }
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
        <ActionResult {...{id: DEPOSIT_NATIVE_CURRENCY_TOAST, ...supplyInfo}} />
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
                        <PriceAsync comet={comet} priceFeed={token?.priceFeed} amount={amount} />
                        </div>
                      </div>
                      <div>
                          <button type="button" className="btn btn-light border border-light-subtle rounded-4 mb-2">
                              <div className="d-flex align-items-center">
                                  <TokenIcon symbol={nativeCurrency.symbol} width={30} />
                                  <span className="px-3">{nativeCurrency.symbol}</span> 
                              </div>
                          </button>
                          <div className="text-center text-body-secondary small">
                            Wallet : <AsyncAmount {...asyncBalance} />
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



