import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { Hash } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'
import { ModalEvent, useBootstrap, useModalEvent } from '../../../hooks/useBootstrap'
import { useCurrentAccount } from '../../../hooks/useCurrentAccount'
import { useCurrentChain } from '../../../hooks/useCurrentChain'
import { useSupplyService } from '../../../hooks/useSupplyService'
import css from '../../../styles/components/collaterals/DepositCollateralNative.module.scss'
import { Zero, bn, fromBigInt } from '../../../utils/bn'
import * as ChainUtils from '../../../utils/chains'
import AmountInput from '../../AmountInput'
import AmountPercent, { fillInput } from '../../AmountPercent'
import { SmallSpinner } from '../../Spinner'
import TokenIcon from '../../TokenIcon'
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../../utils/async'
import AsyncAmount from '../../AmountAsync'
import { ActionType, DepositParam } from '../../../types'
import PriceFromFeed from '../../PriceFromFeed'
import { ACTION_RESULT_TOAST } from '../../action-result/ActionResult'
import Amount from '../../Amount'
import WarningMessage from '../../WarningMessage'
import Spacer from '../../Spacer'

const enum Mode {
  NotConnected,
  Init,
  InsufficientBalance,
  DepositReady,
  ConfirmationOfDeposit,
  WaitingForDeposit,
}

export const DEPOSIT_COLLATERAL_NATIVE_MODAL = 'deposit-collateral-native-modal'

export default function DepositCollateralNative({ comet, token, onDeposit }  : DepositParam) {

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)

    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)
    const { isSuccess: isBalance, data: balance } = asyncBalance

    const [ supplyHash, setSupplyHash ] = useState<Hash>()

    const { isConnected, address } = useCurrentAccount()

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(DEPOSIT_COLLATERAL_NATIVE_MODAL)

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
        const action = ActionType.DepositCollateral
        const amountCopy = bn(amount)
        const hashCopy = structuredClone(supplyHash)
        onDeposit({ comet, action, token, amount: amountCopy, hash: hashCopy })
        hideModal(DEPOSIT_COLLATERAL_NATIVE_MODAL)
      }
    }, [mode, supplyHash])

    useEffect(() => {
      if (mode === Mode.Init && publicClient) {
        loadBalance()
      }
    }, [mode, publicClient])

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
    
    async function onOpen() {
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
      setInput(null)
      setMode(null)
      setAsyncBalance(IdleData)
      setSupplyHash(null)
    }
    
    function loadBalance() {
      const promise = publicClient.getBalance({ address }).then(fromBigInt)
      loadAsyncData(promise, setAsyncBalance)
    }

    function setInput(amount: BigNumber) {
      fillInput({ amount, token, id: css['deposit-native-input'] })
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleDeposit() {
      setMode(Mode.ConfirmationOfDeposit)
      supplyService.supplyNativeCurrency({ amount }).then(setSupplyHash)
    }

    function handleWalletBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor).dp(token.decimals)
      setAmount(newAmount)
      setInput(newAmount)
    }

    return (
        <div id={DEPOSIT_COLLATERAL_NATIVE_MODAL} className="modal" tabIndex={-1}>
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
                          disabled={Mode.Init === mode}  />
                        <div className="small text-body-tertiary">
                        <PriceFromFeed priceFeed={token?.priceFeed} amount={amount} />
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
                      Insufficient {nativeCurrency.symbol} Balance
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
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Insufficient {nativeCurrency.symbol} Balance</button>
                  }
                  { mode === Mode.ConfirmationOfDeposit &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
                  }
                  { mode === Mode.DepositReady &&
                    <>
                      { amount.isGreaterThan(Zero) ? (
                          <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleDeposit}>Deposit <Amount value={amount} /> {nativeCurrency.symbol}</button>
                        ) : (
                          <button className="btn btn-lg btn-primary text-white" type="button">Deposit {nativeCurrency.symbol}</button>
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



