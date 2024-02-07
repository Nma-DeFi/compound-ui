import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useModalEvent } from '../../hooks/useBootstrap';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';
import { ActionInfo } from '../../pages/farm';
import * as MarketSelector from "../../selectors/market-selector";
import css from '../../styles/components/farm/WithdrawNative.module.scss';
import { Zero, bn } from '../../utils/bn';
import AmountInput from '../AmountInput';
import AmountPercent from '../AmountPercent';
import { SmallSpinner } from '../Spinner';
import Result from './Result';

const Mode = {
  NotConnected: 0,
  Init: 1,
}

export const WITHDRAW_NATIVE_CURRENCY_MODAL = 'withdraw-native-modal'
export const WITHDRAW_NATIVE_CURRENCY_TOAST = 'withdraw-native-toast'

export default function WithdrawNativeCurrency(market) {

    const [ mode, setMode ] = useState<number>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ withdrawInfo, setWithdrawInfo ] = useState<ActionInfo>()

    const { isConnected } = useCurrentAccount()

    const baseToken = MarketSelector.baseToken(market)

    const modalEvent = useModalEvent(WITHDRAW_NATIVE_CURRENCY_MODAL)

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
      setInput(null)
    }

    function initState() {
      setAmount(Zero)
      setMode(null)
      setWithdrawInfo(null)
    }
    
    function setInput(value: string) {
      const id = css['withdraw-native-input']
      const elem = document.getElementById(id) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
    }

    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleBalancePercent(factor: number) {
      if (!isConnected) return
    }

    return (
      <>
        <Result {...{id: WITHDRAW_NATIVE_CURRENCY_TOAST, ...withdrawInfo}} />
        <div id={WITHDRAW_NATIVE_CURRENCY_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['withdraw-native-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Withdraw</h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['withdraw-native-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                      <AmountInput 
                          id={css['withdraw-native-input']} 
                          onChange={handleAmountChange} 
                          disabled={Mode.Init === mode} 
                          focused={true} />
                        <div className="small text-body-tertiary">
                        $0.000
                        </div>
                      </div>
                      <div>
                          <button type="button" className="btn btn-light border border-light-subtle rounded-4 mb-2">
                              <div className="d-flex align-items-center">
                                  <img src={`/images/tokens/${baseToken?.symbol}.svg`} alt={baseToken?.symbol} width="30" /> 
                                  <span className="px-3">{baseToken?.symbol}</span> 
                              </div>
                          </button>
                          <div className="text-center text-body-secondary small">Balance : <span className="text-body-tertiary">0.00</span></div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}