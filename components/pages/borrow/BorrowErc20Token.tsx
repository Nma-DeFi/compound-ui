import { usePublicClient, useWalletClient } from "wagmi"
import Amount from "../../Amount"
import { usePriceFromFeed } from "../../../hooks/usePriceFromFeed"
import { useCurrentChain } from "../../../hooks/useCurrentChain"
import PriceAsync from "../../PriceAsync"
import { nf } from "../../../utils/number"
import { NoData } from "../../Layout"
import { useEffect, useState } from "react"
import { useBootstrap, useModalEvent } from "../../../hooks/useBootstrap"
import { SmallSpinner } from "../../Spinner"
import { Hash } from "viem"
import { useWithdrawService } from "../../../hooks/useWithdrawService"
import { useCurrentAccount } from "../../../hooks/useCurrentAccount"
import { ActionType } from "../../../types"
import { BORROW_RESULT_TOAST } from "../../../pages/borrow"

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
      onBorrow({ action: ActionType.Borrow, token, amount, hash: transactionHash })
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
    setTransactionHash(null)
  }

  function onHide() {
    if (mode === Mode.WaitingForTransaction) {
      openToast(BORROW_RESULT_TOAST)
    }
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
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="m-0">Borrow</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="text-center rounded py-3 px-3 mb-2 bg-body-tertiary">
              <div className="fs-2 mb-2">
                <Amount value={amount} /> {token?.symbol}
              </div>
              <div className="fs-5 text-secondary">
                <PriceAsync asyncPrice={price} />
              </div>
            </div>  
            <div className="d-flex small mb-4">
              <div className="me-auto">Borrow APR : <span className="text-body-tertiary">{nf(borrowApr)}<small>%</small></span></div>
              <div>Liquidation risk : <span className="text-success">{NoData}</span></div>
            </div>
            <div className="d-grid mt-4">
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