import { useEffect, useState } from 'react';
import { useBootstrap, useModalEvent } from '../../hooks/useBootstrap';
import css from '../../styles/components/farm/WithdrawErc20.module.scss';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';
import BigNumber from 'bignumber.js';
import { Zero, bn, bnf } from '../../utils/bn';
import AmountInput from '../AmountInput';
import { useSupplyBalance } from '../../hooks/useSupplyBalance';
import { useCurrentChain } from '../../hooks/useCurrentChain';
import * as MarketSelector from "../../selectors/market-selector"
import { SmallSpinner } from '../Spinner';
import { usePrice } from '../../hooks/usePrice';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useWithdrawService } from '../../hooks/useWithdrawService';
import { Hash } from 'viem';
import { Action, ActionInfo } from '../../pages/farm';
import Result from './Result';
import AmountPercent from '../AmountPercent';

const Mode = {
  NotConnected: 0,
  Init: 1,
  InsufficientBalance: 2,
  WithdrawReady: 3,
  ConfirmationOfWithdraw: 4,
  WaitingForWithdraw: 5
}

export const WITHDRAW_ERC20_TOKEN_MODAL = 'withdraw-erc20-modal'
export const WITHDRAW_ERC20_TOKEN_TOAST = 'withdraw-erc20-toast'

export default function WithdrawErc20Token(market) {

    const [ mode, setMode ] = useState<number>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ withdrawHash, setWithdrawHash ] = useState<Hash>()
    const [ withdrawInfo, setWithdrawInfo ] = useState<ActionInfo>()

    const { currentChainId: chainId } = useCurrentChain()
    const { isConnected, address: account } = useCurrentAccount()

    const baseToken = MarketSelector.baseToken(market)
    const comet = MarketSelector.cometProxy(market)

    const publicClient = usePublicClient({ chainId })
    const { data: walletClient } = useWalletClient()
    
    const { 
        isSuccess: isBalance, 
        data: balance
    } = useSupplyBalance({ comet, publicClient, account })

    const { 
      isSuccess: isPrice, 
      data: price 
    } = usePrice({ token: baseToken })

    const withdrawService = useWithdrawService({ comet, publicClient, walletClient, account })

    const { hideModal, openToast } = useBootstrap()
    const modalEvent = useModalEvent(WITHDRAW_ERC20_TOKEN_MODAL)

    useEffect(() => {
      if (!isConnected || !balance || !withdrawService) return
      if (amount.isGreaterThan(balance)) {
        setMode(Mode.InsufficientBalance)
      } else {
        setMode(Mode.WithdrawReady)
      }
    }, [balance, amount, withdrawService])

    useEffect(() => {
      if (withdrawHash && mode === Mode.ConfirmationOfWithdraw) {
        setMode(Mode.WaitingForWithdraw)
        setWithdrawInfo({ action: Action.Withdraw, token: baseToken, amount, hash: withdrawHash })
        hideModal(WITHDRAW_ERC20_TOKEN_MODAL)
      }
    }, [withdrawHash])

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
      if (mode === Mode.WaitingForWithdraw) {
        openToast(WITHDRAW_ERC20_TOKEN_TOAST)
      }
      setMode(null)
    }

    function initState() {
      setAmount(Zero)
      setInput(null)
      setWithdrawHash(null)
      setWithdrawInfo(null)
    }
    
    function setInput(value: string) {
      const elem = document.getElementById(css['withdraw-input']) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleWithDraw() {
      if (amount.isZero()) return
      setMode(Mode.ConfirmationOfWithdraw)
      withdrawService.withdraw({ token: baseToken, amount }).then(setWithdrawHash)
    }

    function handleBalancePercent(factor: number) {
      if (!isConnected) return
      const newAmount = balance.times(factor)
      const newInput = bnf(newAmount)
      setAmount(newAmount)
      setInput(newInput)
    }

    return (
      <>
        <Result {...{id: WITHDRAW_ERC20_TOKEN_TOAST, ...withdrawInfo}} />
        <div id={WITHDRAW_ERC20_TOKEN_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['withdraw-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Withdraw</h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['withdraw-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                      <AmountInput 
                          id={css['withdraw-input']} 
                          onChange={handleAmountChange} 
                          disabled={Mode.Init === mode} 
                          focused={[Mode.NotConnected, Mode.WithdrawReady].includes(mode)} />
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
                          <div className="text-center text-body-secondary small">Balance : <span className="text-body-tertiary">{ bnf(isBalance ? balance : 0) }</span></div>
                      </div>
                  </div>
                  <div className="row g-2">
                    <AmountPercent handler={handleBalancePercent} />
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
                  { mode === Mode.WithdrawReady &&
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleWithDraw}>Withdraw {baseToken?.symbol}</button>
                  }
                  { mode === Mode.ConfirmationOfWithdraw &&
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