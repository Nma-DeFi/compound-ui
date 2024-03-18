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
//import { Step, Stepper } from "react-form-stepper"

export const BORROW_NATIVE_CURRENCY = 'borrow-native-currency'

const enum Mode {
  Init,
  BulkerNotApproved,
  ConfirmBulkerApproval,
  WaitingForBulkerApproval,
  BorrowReady,
  ConfirmLoan,
  WaitingForLoan,
}

export default function BorrowNativeCurrency({ comet, token, amount, priceFeed, borrowApr }) {
  
  const [ mode, setMode ] = useState<Mode>()
  const [ transactionHash, setTransactionHash ] = useState<Hash>()

  const { address: account } = useCurrentAccount()

  const { currentChainId: chainId } = useCurrentChain()

  const publicClient = usePublicClient({ chainId })

  const { data: walletClient } = useWalletClient()

  const withdrawService = useWithdrawService({ comet, publicClient, walletClient, account })

  const price = usePriceFromFeed({ chainId, publicClient, amount, priceFeed })

  const modalEvent = useModalEvent(BORROW_NATIVE_CURRENCY)

  const { hideModal } = useBootstrap()

  useEffect(() => {
    if (mode === Mode.Init && withdrawService && price.isSuccess) {
      setMode(Mode.BorrowReady)
    }
  }, [mode, withdrawService, price])

  
  useEffect(() => {
    if (mode === Mode.ConfirmLoan && transactionHash) {
      setMode(Mode.WaitingForLoan)
      //setWithdrawInfo({ action: withdrawType, token, amount, hash: transactionHash })
      hideModal(BORROW_NATIVE_CURRENCY)
    }
  }, [mode, transactionHash])
  
  useEffect(() => {
    switch (modalEvent) {
      case 'show':
        onOpen()
        break
    } 
  }, [modalEvent])

  function onOpen() {
    setMode(Mode.Init)
    setTransactionHash(null)
  }

  function handleBorrow() {
    setMode(Mode.ConfirmLoan)
    withdrawService.withdrawErc20Token({ token, amount }).then(setTransactionHash)
  }

  return (
    <div id={BORROW_NATIVE_CURRENCY} className="modal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="m-0">Borrow native</h3>
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
            <div className="d-flex small">
              <div className="me-auto">Borrow APR : <span className="text-body-tertiary">{nf(borrowApr)}<small>%</small></span></div>
              <div>Liquidation risk : <span className="text-success">{NoData}</span></div>
            </div>
            {/*<Stepper activeStep={1} 
              connectorStyleConfig={{ 
                size: 2, 
                disabledColor: '#bdbdbd',
                activeColor: '#ed1d24',
                completedColor: '#a10308',
                style: 'solid',
                stepSize: '2em'
              }}
              styleConfig={{ 
                  size: 30,  
                  activeBgColor : undefined,
                  activeTextColor : undefined,
                  completedBgColor : undefined,
                  completedTextColor : undefined,
                  inactiveBgColor : undefined,
                  inactiveTextColor : undefined,
                  circleFontSize : undefined,
                  labelFontSize : undefined,
                  borderRadius : undefined,
                  fontWeight : undefined,
                }}>
              <Step label="Enable loan" active={false} completed={false} />
              <Step label="Confirm loan" />
              </Stepper>
            <Stepper activeStep={1} className="my-2 rounded border">
              <Step label="Enable loan"/>
              <Step label="Confirm loan" />
            </Stepper>*/}
            <div className="d-grid">
              { mode === Mode.Init &&
                <button className="btn btn-lg btn-primary text-white" type="button" disabled>Initialisation <SmallSpinner /></button>
              }
              { mode === Mode.BorrowReady &&
                <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleBorrow}>Withdraw {token?.symbol}</button>
              }
              { mode === Mode.ConfirmLoan &&
                <button className="btn btn-lg btn-primary text-white" type="button" disabled>Confirmation <SmallSpinner /></button>
              }
            </div>
          </div>        
        </div>
      </div>
    </div>
  )
}