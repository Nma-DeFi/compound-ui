import { usePublicClient, useWalletClient } from "wagmi"
import Amount from "../../Amount"
import { usePriceFromFeed } from "../../../hooks/usePriceFromFeed"
import { useCurrentChain } from "../../../hooks/useCurrentChain"
import PriceAsync from "../../PriceAsync"
import { nf } from "../../../utils/number"
import { useEffect, useState } from "react"
import { useBootstrap, useModalEvent } from "../../../hooks/useBootstrap"
import { SmallSpinner } from "../../Spinner"
import { Hash } from "viem"
import { useWithdrawService } from "../../../hooks/useWithdrawService"
import { useCurrentAccount } from "../../../hooks/useCurrentAccount"
import { ActionType } from "../../../types"
import { BORROW_RESULT_TOAST } from "../../../pages/borrow"
import TokenIcon from "../../TokenIcon"
import css from '../../../styles/components/borrow/BorrowErc20Token.module.scss'

const enum Mode {
  Init,
  BorrowReady,
  ConfirmTransaction,
  WaitingForTransaction,
}

export const BORROW_ERC20_MODAL = 'borrow-erc20-borrow'

export default function BorrowErc20Token({ comet, token, amount, priceFeed, borrowApr, onBorrow }) {
  
  const [ mode, setMode ] = useState<Mode>()
  const [ transactionHash, setTransactionHash ] = useState<Hash>()

  const { address: account } = useCurrentAccount()

  const { currentChainId: chainId } = useCurrentChain()

  const publicClient = usePublicClient({ chainId })

  const { data: walletClient } = useWalletClient()

  const withdrawService = useWithdrawService({ comet, publicClient, walletClient, account })

  const price = usePriceFromFeed({ chainId, publicClient, amount, priceFeed })

  const modalEvent = useModalEvent(BORROW_ERC20_MODAL)

  const { hideModal, openToast } = useBootstrap()

  useEffect(() => {
    if (mode === Mode.Init && withdrawService && price.isSuccess) {
      setMode(Mode.BorrowReady)
    }
  }, [mode, withdrawService, price])
  
  useEffect(() => {
    if (mode === Mode.ConfirmTransaction && transactionHash) {
      setMode(Mode.WaitingForTransaction)
      const action = ActionType.Borrow
      const hash = structuredClone(transactionHash)
      onBorrow({ action, token, amount, hash })
      hideModal(BORROW_ERC20_MODAL)
    }
  }, [mode, transactionHash])
  
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
    setMode(Mode.Init)
  }

  function onHide() {
    if (mode === Mode.WaitingForTransaction) {
      openToast(BORROW_RESULT_TOAST)
    }
    setMode(null)
    setTransactionHash(null)
  }

  function handleBorrow() {
    setMode(Mode.ConfirmTransaction)
    withdrawService.withdrawErc20Token({ token, amount }).then(setTransactionHash)
  }

  return (
    <div id={BORROW_ERC20_MODAL} className="modal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className={`${css['title']} d-flex justify-content-between align-items-center`}>
              <h3 className="m-0">Confirm loan</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <td className={`${css['table-label']} table-light fw-semibold`}>Borrow amount</td>
                  <td className="d-flex justify-content-center align-items-center">
                    <TokenIcon symbol={ token?.symbol } css="me-2" width="20" />
                    <Amount value={ amount } /> 
                    <span className="text-body-secondary ps-1">{ token?.symbol }</span>
                    <small className="ps-3 text-body-secondary">(<PriceAsync asyncPrice={price} />)</small>
                  </td>
                </tr>
                <tr>
                  <td className={`${css['table-label']} table-light fw-semibold`}>Borrow APR</td>
                  <td className="text-center">{ nf(borrowApr) }<small className="text-body-secondary">%</small></td>
                </tr>
                <tr>
                  <td className={`${css['table-label']} table-light fw-semibold`}>Liquidation risk</td>
                  <td className="align-middle px-3">
                    <div className="progress" 
                      role="progressbar" 
                      aria-label="Liquidation risk" 
                      aria-valuenow={15} 
                      aria-valuemin={0} 
                      aria-valuemax={100} 
                      style={{height: '20px'}} 
                      title="Liquidation risk : 15%">
                        <div className="progress-bar text-bg-success overflow-visible px-1" style={{width: '15%'}}>15%</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={`${css['button-grid']} d-grid`}>
              { mode === Mode.Init &&
                <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
              }
              { mode === Mode.BorrowReady &&
                <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleBorrow}>Borrow {token?.symbol}</button>
              }
              { mode === Mode.ConfirmTransaction &&
                <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
              }
            </div>
          </div>        
        </div>
      </div>
    </div>
  )
}