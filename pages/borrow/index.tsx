import Head from "next/head"
import Link from "next/link"
import { Path } from "../../components/Layout"
import { useBootstrap } from "../../hooks/useBootstrap"
import SelectTokenToBorrow, { SELECT_TOKEN_TO_BORROW_MODAL } from "../../components/pages/borrow/SelectTokenToBorrow"
import { ReactNode, useEffect, useState } from "react"
import TokenIcon from "../../components/TokenIcon"
import { getBaseTokenOrNativeCurrency, getPriceFeed } from "../../utils/markets"
import { useCurrentChain } from "../../hooks/useCurrentChain"
import { Zero, bn } from "../../utils/bn"
import { baseBorrowMinScaled, collateralTokens, cometProxy, netBorrowAprScaled } from "../../selectors/market-selector"
import { useMarkets } from "../../hooks/useMarkets"
import css from '../../styles/pages/Borrow.module.scss'
import AmountInput from "../../components/AmountInput"
import { useCurrentAccount } from "../../hooks/useCurrentAccount"
import { useSupplyPositions } from "../../hooks/useSupplyPositions"
import { useBorrowCapacity } from "../../hooks/useBorrowCapacity"
import BigNumber from "bignumber.js"
import PriceAsync from "../../components/PriceAsync"
import { ActionInfo, Market } from "../../types"
import { usePublicClient } from "wagmi"
import { usePriceFromFeed } from "../../hooks/usePriceFromFeed"
import PlaceHolder, { PlaceHolderSize } from "../../components/PlaceHolder"
import { SmallSpinner } from "../../components/Spinner"
import Amount from "../../components/Amount"
import BorrowNativeCurrency from "../../components/pages/borrow/BorrowNativeCurrency"
import ActionResult from "../../components/action-result/ActionResult"
import { useAppDispatch } from "../../redux/hooks"
import { marketChanged } from "../../redux/slices/currentMarket"
import { useCurrentMarket } from "../../hooks/useCurrentMarket"
import { getTokenOrNativeCurrency } from "../../utils/chains"
import { getLiquidationRiskByBorrowAmount } from "../../redux/helpers/liquidation"
import { useBorrowPositions } from "../../hooks/useBorrowPositions"
import { useCollateralPositions } from "../../hooks/useCollateralPositions"
import { usePriceService } from "../../hooks/usePriceService"
import BorrowErc20Token, { BORROW_ERC20_MODAL } from "../../components/pages/borrow/BorrowErc20Token"
import BorrowPositions from "../../components/pages/borrow/BorrowPositions"
import Apr from "../../components/Apr"

const enum Mode {
  Loading,
  NotConnected,
  FarmingBaseToken,
  InsufficientBorrowCapacity,
  InsufficientBorrowAmount,
  ReadyToBorrow,
}

export const BORROW_RESULT_TOAST = 'borrow-result-toast'

export default function Borrow() {

    const [ mode, setMode ] = useState<Mode>(Mode.Loading)
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ borrowResult, setBorrowResult ] = useState<ActionInfo>()
    const [ borrowInfo, setBorrowInfo ] = useState(null)
    const [ newLiquidationRisk, setNewLiquidationRisk ] = useState<number>()


    const currentMarket = useCurrentMarket()

    const comet = cometProxy(currentMarket)

    const { isConnected } = useCurrentAccount()

    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const { openModal } = useBootstrap()

    const dispatch = useAppDispatch()

    const { isSuccess: isMarkets, data: markets } = useMarkets({ chainId })

    const { isSuccess: isSupplyPositions, data: supplyPositions } = useSupplyPositions()
    const { isSuccess: isBorrowPositions, data: borrowPositions } = useBorrowPositions()
    const { isSuccess: isCollateralPositions, data: collateralPositions } = useCollateralPositions()

    const asyncBorrowCapacity  =  useBorrowCapacity({ chainId, publicClient, marketId: comet })

    const priceService = usePriceService({ chainId, publicClient })

    const priceFeed = getPriceFeed(currentMarket, chainId)
    
    const asyncAmountUsd = usePriceFromFeed({ chainId, publicClient, amount, priceFeed })

    const token = getBaseTokenOrNativeCurrency(currentMarket, chainId)
    const borrowApr = netBorrowAprScaled(currentMarket)
    const minBorrowAmount = baseBorrowMinScaled(currentMarket)
    const collaterals = collateralTokens(currentMarket)

    const { isSuccess: isBorrowCapacity, data: borrowCapacity } = asyncBorrowCapacity
    const { isSuccess: isAmountUsd, data: amountUsd } = asyncAmountUsd

    useEffect(() => { 
      if (isLoading()) {
        setMode(Mode.Loading)
      } else if (!isConnected) {
        setMode(Mode.NotConnected)
      } else if (isFarmingBaseToken()) {
        setMode(Mode.FarmingBaseToken)
      } else if (isInsufficientBorrowCap()) {
        setMode(Mode.InsufficientBorrowCapacity)
      }  else if (isInsufficientBorrowAmount()) {
        setMode(Mode.InsufficientBorrowAmount)
      } else {
        setMode(Mode.ReadyToBorrow)
        const { borrowBalance } = borrowPositions[comet]
        const borrowAmount = borrowBalance.plus(amount)
        getLiquidationRiskByBorrowAmount({ chainId, market: currentMarket, collateralPositions, priceService, borrowAmount }).then(setNewLiquidationRisk)
      }
    })
    
    useEffect(() => {
      if (isMarkets && !currentMarket) {
        setCurrentMarket(markets[0])
      }
    }, [chainId, markets])

    useEffect(() => {
      if (currentMarket) {
        setAmount(Zero)
        setInput(null)
      }
    }, [chainId, currentMarket])

    function isLoading() {
      if (!isMarkets || !currentMarket) return true
      console.log('isLoading', 
        'isConnected', isConnected, 
        'isSupplyPositions', isSupplyPositions,
        'isBorrowPositions', isBorrowPositions,
        'isCollateralPositions', isCollateralPositions,
        'priceService', !!priceService,
        'isBorrowCapacity', isBorrowCapacity,
        'isAmountUsd', isAmountUsd,)
      if (isConnected &&  (!isSupplyPositions || !isBorrowPositions || !isCollateralPositions 
        || !!!priceService || !isBorrowCapacity || !isAmountUsd)) return true
      return false
    }

    function isFarmingBaseToken() {
      return supplyPositions[comet].supplyBalance.isGreaterThan(Zero)
    }

    function isInsufficientBorrowCap() {
      return borrowCapacity.isZero() || borrowCapacity.isLessThan(amountUsd)
    }

    function isInsufficientBorrowAmount() {
      return !amount.isZero() && amount.isLessThan(minBorrowAmount)
    }
    
    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function handleBorrow() {
      if (amount.isZero()) return
      const borrowInfo = { 
        comet, token, amount, 
        priceFeed, borrowApr, 
        liquidationRisk: newLiquidationRisk,
        onBorrow: setBorrowResult 
      }
      //console.log('borrowInfo !!', borrowInfo)
      setBorrowInfo(borrowInfo)
      /*if (isNativeCurrencyMarket(currentMarket, chainId)) {
        openModal(BORROW_NATIVE_CURRENCY)
      } else {
        openModal(BORROW_ERC20_MODAL)
      }*/
      openModal(BORROW_ERC20_MODAL)
    }
    
    function setInput(value: string) {
      const id = css['borrow-input']
      const elem = document.getElementById(id) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
    }

    function setCurrentMarket(market: Market) {
      dispatch(marketChanged(market))
    }

    return ( 
      <>
        <Head>
          <title>Borrow</title>
        </Head>
        <div className="col-12 col-xl-6 col-xxl-5 px-xl-5">
          <div className="bg-body p-3 rounded border shadow">
            <h2 className="mb-4">Borrow</h2>
            <div className="d-flex border align-items-center p-3 rounded mb-2">
                <div className="flex-grow-1">
                    <AmountInput 
                      id={css['borrow-input']} 
                      onChange={handleAmountChange} 
                      disabled={false} 
                      focused={true} />
                    <small className="text-body-tertiary">
                    { mode === Mode.Loading ? (
                        <PlaceHolder col={2} />
                      ) : (
                        <PriceAsync asyncPrice={asyncAmountUsd} />
                      )
                    }
                    </small>
                </div>
                <button type="button" className="btn btn-lg btn-light border border-light-subtle rounded-5" onClick={() => openModal(SELECT_TOKEN_TO_BORROW_MODAL)}>
                  { mode === Mode.Loading ? (
                      <div className="d-flex align-items-center">
                        <div className="me-1 me-sm-2 mb-1" style={{ width: '6rem'}}>
                          <PlaceHolder size={PlaceHolderSize.DEFAULT} col={12} />
                        </div>
                        <i className="bi bi-chevron-down"></i>
                        </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <TokenIcon symbol={ token?.symbol } css="me-2 me-sm-3" width="35" />
                        <span className="me-2 me-sm-3">
                          { token?.symbol }
                        </span> 
                        <i className="bi bi-chevron-down"></i>
                      </div>
                    )
                  }
                </button>
            </div>
            { mode === Mode.Loading  &&    
              <BorrowPanel {...{ mode, borrowApr, css: 'pb-1' }}>
                <div style={{ width: '20rem'}}>
                  <PlaceHolder size={PlaceHolderSize.DEFAULT} col={12} />
                </div>
              </BorrowPanel>
            }
            { mode === Mode.NotConnected &&
              <BorrowPanel {...{ mode, borrowApr, css: 'pb-2' }}>
                <div className="d-flex align-items-center">
                  <span className="pe-2" style={{ fontSize: '110%' }}>
                  { collaterals.length > 1 ? 'Collaterals' : 'Collateral' }
                  </span>
                  { collaterals.map((collateral) =>
                    <span key={collateral.token.address} className="text-body-tertiary ps-2">
                      <TokenIcon symbol={getTokenOrNativeCurrency(chainId, collateral.token)?.symbol} width="28" />
                    </span>
                  )}
                </div>
              </BorrowPanel>
            }
            { mode === Mode.FarmingBaseToken &&
              <BorrowPanel {...{ mode, borrowApr }}>
                Cannot supply and borrow at the same time
              </BorrowPanel>
            }
            { mode === Mode.InsufficientBorrowCapacity &&
              <BorrowPanel {...{ mode, borrowApr }}>
                <div className="mb-1">
                  { borrowCapacity?.isEqualTo(Zero) ?
                    <>No borrowing capacity</>
                  :
                    <>Insufficient borrowing capacity</>
                  }
                </div>
                <Link href={`${Path.Borrow}/collateral`} className="text-decoration-none">
                  Add collateral <i className="bi bi-arrow-right"></i>
                </Link>
              </BorrowPanel>
            }
            { mode === Mode.InsufficientBorrowAmount &&
              <BorrowPanel {...{ mode, borrowApr }}>
                Minimum borrow amount : <Amount value={minBorrowAmount} /> { token?.symbol }
              </BorrowPanel>
            }
            { mode === Mode.ReadyToBorrow &&
              <BorrowPanel {...{ mode, borrowApr }}>
                <div className="mb-1">Maximum borrowing : <span className="text-body-tertiary">
                  <PriceAsync asyncPrice={{ 
                    isIdle: asyncBorrowCapacity.isPending, 
                    isLoading: asyncBorrowCapacity.isLoading, 
                    isSuccess: asyncBorrowCapacity.isSuccess, 
                    isError: asyncBorrowCapacity.isError, 
                    data: asyncBorrowCapacity.data 
                  }} /></span></div>
                <Link href={`${Path.Borrow}/collateral`} className="text-decoration-none">Increase your borrowing capacity <i className="bi bi-arrow-right"></i></Link>
              </BorrowPanel>
            }
            <div className="d-grid">
                { mode === Mode.NotConnected ? (
                    <button className="btn btn-lg btn-primary text-white" type="button"  onClick={handleBorrow}>Connect Wallet</button>
                  ) : mode === Mode.Loading ? (
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Loading <SmallSpinner /></button>
                  ) : (
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={handleBorrow}>Borrow {token?.symbol}</button>
                  )
                }
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-3 col-xxl-2">
          { isConnected &&
            <BorrowPositions />
          }
        </div>
        <SelectTokenToBorrow onSelect={setCurrentMarket} />
        <BorrowErc20Token  {...borrowInfo} />
        <BorrowNativeCurrency  {...borrowInfo} />
        <ActionResult {...{id: BORROW_RESULT_TOAST, comet, ...borrowResult}} />
      </>
    )
}

function BorrowPanel({ children, mode, borrowApr, css = ''} : { children: ReactNode, mode: Mode; borrowApr: number; css?: string }) {
  return (
    <div className={`d-flex flex-wrap justify-content-between mb-4 pt-1 ${css}`}>
      <div>{ children }</div>
      <div className="my-2 my-sm-0">
        <BorrowApr {...{ mode, borrowApr }} />
      </div>
    </div>
  )
}

function BorrowApr({ mode, borrowApr} : { mode: Mode; borrowApr: number }) {
  return (
    <div className="px-2 py-1 me-1 shadow-sm rounded small">
      { mode === Mode.Loading ? 
        (
          <div style={{ width: '6rem'}}>
            <PlaceHolder size={PlaceHolderSize.SMALL} col={12} />
          </div>
        ) : (
          <>Borrow APR : <span className="text-body-tertiary"><Apr value={borrowApr} /></span></>
        )
      }
    </div>
  )
}
  