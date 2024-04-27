import { usePublicClient, useWalletClient } from "wagmi"
import { useCurrentChain } from "../../../hooks/useCurrentChain"
import * as MarketSelector from "../../../selectors/market-selector"
import * as MarketUtils from '../../../utils/markets'
import * as ChainUtils from '../../../utils/chains'
import { ActionType, PriceFeed, Token } from "../../../types"
import { useEffect, useState } from "react"
import { AsyncBigNumber, IdleData, loadAsyncData } from "../../../utils/async"
import { Hash } from "viem"
import { Zero, bn, fromBigInt } from "../../../utils/bn"
import BigNumber from "bignumber.js"
import { useCurrentAccount } from "../../../hooks/useCurrentAccount"
import { ModalEvent, useBootstrap, useModalEvent } from "../../../hooks/useBootstrap"
import { useSupplyService } from "../../../hooks/useSupplyService"
import { ACTION_RESULT_TOAST } from "../../action-result/ActionResult"
import css from '../../../styles/components/farm/DepositBaseTokenNative.module.scss'
import AmountInput from "../../AmountInput"
import PriceFromFeed from "../../PriceFromFeed"
import TokenIcon from "../../TokenIcon"
import AsyncAmount from "../../AmountAsync"
import AmountPercent from "../../AmountPercent"
import { SmallSpinner } from "../../Spinner"
import { useBorrowPositions } from "../../../hooks/useBorrowPositions"
import { isBorrowPosition } from "../../../redux/helpers/borrow"

const enum Mode {
    NotConnected,
    Init,
    BorrowingBaseToken,
    InsufficientBalance,
    DepositReady,
    ConfirmationOfDeposit,
    WaitingForDeposit,
}

export const DEPOSIT_BASE_TOKEN_NATIVE_MODAL = 'deposit-base-token-native-modal'

export default function DepositBaseTokenNative(market) {

    const { currentChainId: chainId } = useCurrentChain()
    const publicClient = usePublicClient({ chainId })

    const { isConnected, address } = useCurrentAccount()

    const comet = MarketSelector.cometProxy(market)
    const baseToken = MarketSelector.baseToken(market)

    const priceFeed : PriceFeed = {
        address: MarketSelector.baseTokePriceFeed(market),
        kind: MarketUtils.getPriceFeedKind(market, chainId)
    }

    const token: Token = {...baseToken, priceFeed }

    const onDeposit = market.onAction

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)

    const [ asyncBalance, setAsyncBalance ] = useState<AsyncBigNumber>(IdleData)
    const { isSuccess: isBalance, data: balance } = asyncBalance

    const [ supplyHash, setSupplyHash ] = useState<Hash>()

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(DEPOSIT_BASE_TOKEN_NATIVE_MODAL)

    const { data: walletClient } = useWalletClient()

    const nativeCurrency = ChainUtils.nativeCurrency(chainId)

    const { isSuccess: isBorrowPositions, data: borrowPositions } = useBorrowPositions()

    const supplyService = useSupplyService({ publicClient, walletClient, account: address, comet })

    useEffect(() => {
      if (!isConnected || !isBalance || !isBorrowPositions) return
      if (isBorrowingBaseToken()) {
        setMode(Mode.BorrowingBaseToken)
      } else if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else {
        setMode(Mode.DepositReady)
      }
    }, [amount, balance, borrowPositions])
        
    useEffect(() => {
      if (mode === Mode.ConfirmationOfDeposit && supplyHash) {
        setMode(Mode.WaitingForDeposit)
        const action = ActionType.DepositBaseToken
        const amountCopy = bn(amount)
        const hashCopy = structuredClone(supplyHash)
        onDeposit({ comet, action, token, amount: amountCopy, hash: hashCopy })
        hideModal(DEPOSIT_BASE_TOKEN_NATIVE_MODAL)
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

    function isBorrowingBaseToken() {
      return isBorrowPosition(comet, borrowPositions)
    }
    
    function loadBalance() {
      const promise = publicClient.getBalance({ address }).then(fromBigInt)
      loadAsyncData(promise, setAsyncBalance)
    }

    function setInput(amount: BigNumber) {
      const newInput = amount ? amount.toFixed() : ''
      const id = css['deposit-native-input']
      const elem = document.getElementById(id) 
      const input = elem as HTMLInputElement
      input.value = newInput
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
      setAmount(newAmount)
      setInput(newAmount)
    }

    return (
        <div id={DEPOSIT_BASE_TOKEN_NATIVE_MODAL} className="modal" tabIndex={-1}>
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
                { mode === Mode.BorrowingBaseToken &&
                    <div className="alert alert-warning" role="alert" style={{ marginTop: '2rem' }}>
                        Cannot supply and borrow {nativeCurrency.symbol} at the same time
                    </div>
                }
                <div className="d-grid" style={{ marginTop: '2rem' }}>
                  { mode === Mode.Init &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
                  }
                  { mode === Mode.NotConnected &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Connect Wallet</button>
                  }
                  { mode === Mode.BorrowingBaseToken &&
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Deposit {nativeCurrency.symbol}</button>
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
    )
}
