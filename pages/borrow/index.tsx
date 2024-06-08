import Link from "next/link"
import { Path } from "../../components/Layout"
import { useBootstrap } from "../../hooks/useBootstrap"
import SelectTokenToBorrow, { SELECT_TOKEN_TO_BORROW_MODAL } from "../../components/pages/borrow/SelectTokenToBorrow"
import { ReactNode, useEffect, useState } from "react"
import TokenIcon from "../../components/TokenIcon"
import { getBaseTokenOrNativeCurrency, getPriceFeed, isNativeCurrencyMarket } from "../../utils/markets"
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
import { ActionInfo, Market, PriceFeed } from "../../types"
import { usePublicClient } from "wagmi"
import { usePriceFromFeed } from "../../hooks/usePriceFromFeed"
import PlaceHolder, { PlaceHolderSize } from "../../components/PlaceHolder"
import { SmallSpinner } from "../../components/Spinner"
import Amount from "../../components/Amount"
import BorrowNativeCurrency, { BORROW_NATIVE_MODAL } from "../../components/pages/borrow/BorrowNativeCurrency"
import ActionResult from "../../components/action-result/ActionResult"
import { useAppDispatch } from "../../redux/hooks"
import { marketChanged } from "../../redux/slices/currentMarket"
import { useCurrentMarket } from "../../hooks/useCurrentMarket"
import { getTokenOrNativeCurrency } from "../../utils/chains"
import { useCollateralPositions } from "../../hooks/useCollateralPositions"
import { usePriceService } from "../../hooks/usePriceService"
import BorrowErc20Token, { BORROW_ERC20_MODAL } from "../../components/pages/borrow/BorrowErc20Token"
import BorrowPositions from "../../components/pages/borrow/BorrowPositions"
import Apr from "../../components/Apr"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import Price from "../../components/Price"
import NoData from "../../components/NoData"
import { useTotalCollateralUsdByChain } from "../../hooks/useTotalCollateralUsdByChain"
import { fillInput } from "../../components/AmountPercent"
import { AsyncNumber, fromUseQueryAsync, loadAsyncData } from "../../utils/async"
import { getLiquidationRiskByBorrowAmountAdded } from "../../redux/helpers/liquidation-risk"
import { useBorrowPositions } from "../../hooks/useBorrowPositions"

const enum Mode {
  InitalLoading,
  Loading,
  NotConnected,
  FarmingBaseToken,
  InsufficientBorrowCapacity,
  InsufficientBorrowAmount,
  ReadyToBorrow,
}

export default function Borrow() {
    const ACCRUED_ESTIMATION = 0.999

    const [ mode, setMode ] = useState<Mode>(Mode.Loading)
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ borrowResult, setBorrowResult ] = useState<ActionInfo>()
    const [ borrowInfo, setBorrowInfo ] = useState(null)
    const [ priceFeed, setPriceFeed ] = useState<PriceFeed>()
    const [ tokenPrice, setTokenPrice ] = useState<AsyncNumber>()

    const { open: openWeb3Modal } = useWeb3Modal()

    const market = useCurrentMarket()
    const comet = cometProxy(market)

    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const { openModal } = useBootstrap()

    const dispatch = useAppDispatch()

    const { isSuccess: isMarkets, data: markets } = useMarkets({ chainId })
    const { isSuccess: isSupplyPositions, data: supplyPositions } = useSupplyPositions()
    const { isSuccess: isCollateralPositions, data: collateralPositions } = useCollateralPositions()
    const { isSuccess: isBorrowPositions, data: borrowPositions } = useBorrowPositions()

    const asyncBorrowCapacity = useBorrowCapacity({ chainId, publicClient, marketId: comet })

    const priceService = usePriceService({ chainId, publicClient })

    const asyncAmountPriceUsd = usePriceFromFeed({ chainId, publicClient, amount, priceFeed })

    const token = getBaseTokenOrNativeCurrency(market, chainId)
    const borrowApr = netBorrowAprScaled(market)
    const minBorrowAmount = baseBorrowMinScaled(market)
    const collaterals = collateralTokens(market)

    const { isSuccess: isBorrowCapacity, data: _borrowCapacity } = asyncBorrowCapacity
    const { isSuccess: isAmountUsd, data: amountUsd } = asyncAmountPriceUsd

    //const liquidationRisk = useLiquidationRiskByBorrowAmount({ chainId, publicClient, market, amount, enabled: (mode === Mode.ReadyToBorrow)})
    let liquidationRisk = null
    const borrowCapacity = _borrowCapacity?.gt(Zero) ? _borrowCapacity.times(ACCRUED_ESTIMATION) : Zero

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
        getLiquidationRiskByBorrowAmountAdded({ 
            chainId, market, collateralPositions, borrowPositions, 
            priceService, amountAdded: amount 
          })
        .then(risk => liquidationRisk = risk)
        .then(() => setMode(Mode.ReadyToBorrow))
      }
    })

    useEffect(() => {
      if (isMarkets && !market) {
        setCurrentMarket(markets[0])
      }
    }, [chainId, markets])

    
    useEffect(() => {
      if (market) {
        resetAmount()
      }
    }, [chainId, market])

    useEffect(() => {
      if (market && priceService) {
        const feed = getPriceFeed(market, chainId)
        setPriceFeed(feed)
        const promise = priceService.getPriceFromFeed(feed)
        loadAsyncData(promise, setTokenPrice)
      }
    }, [chainId, market, priceService])

    function isLoading() {
      if (!isMarkets || !market) return true
      if (isConnected &&  (!isSupplyPositions || !isCollateralPositions || !isBorrowPositions || !isBorrowCapacity || !isAmountUsd || !priceService)) return true
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
      const borrowInfo = { 
        comet, token, amount, 
        priceFeed, borrowApr, 
        liquidationRisk, //liquidationRisk: liquidationRisk.data, 
        onBorrow: setBorrowResult
      }
      setBorrowInfo(borrowInfo)
      if (isNativeCurrencyMarket(market, chainId)) {
        openModal(BORROW_NATIVE_MODAL)
      } else {
        openModal(BORROW_ERC20_MODAL)
      }
    }

    function handleMaxBorrow(e) {
      e.preventDefault()
      if (!tokenPrice.isSuccess) return
      const maxAmount = borrowCapacity.div(tokenPrice.data).dp(token.decimals, BigNumber.ROUND_FLOOR)
      setAmount(maxAmount)
      setInput(maxAmount)
    }

    function setInput(amount: BigNumber) {
      fillInput({ amount, id: css['borrow-input'] })
    }
    
    function resetAmount() {
      setAmount(Zero)
      setInput(null)
    }

    function setCurrentMarket(market: Market) {
      dispatch(marketChanged(market))
    }

    return ( 
      <>
        <div className="col-12 col-lg-8 col-xl-6 col-xxl-5 px-0 px-lg-5">
          <div className="bg-body p-3 rounded border shadow">
            <h2 className="mb-4">Borrow</h2>
            <div className="d-flex border align-items-center rounded mb-2 p-3">
                <div className="flex-grow-1">
                    <AmountInput id={css['borrow-input']} onChange={handleAmountChange} />
                    <small className="text-body-tertiary">
                    { asyncAmountPriceUsd.isIdle ? (
                        <PlaceHolder />
                      ) : (
                        <PriceAsync asyncPrice={asyncAmountPriceUsd} />
                      )
                    }
                    </small>
                </div>
                <button type="button" className="btn btn-lg btn-light border border-light-subtle rounded-5" onClick={() => openModal(SELECT_TOKEN_TO_BORROW_MODAL)}>
                  <div className="d-flex align-items-center">
                    <TokenIcon symbol={ token?.symbol } css="me-2 me-sm-3" width="35" />
                    <span className="me-2 me-sm-3">
                      { token?.symbol }
                    </span> 
                    <i className="bi bi-chevron-down"></i>
                  </div>
                </button>
            </div>
            { mode === Mode.Loading  &&    
              <BorrowPanel {...{ mode, borrowApr, css: 'pb-1' }}>
                <div style={{ width: '20rem'}}>
                  <PlaceHolder size={PlaceHolderSize.LARGE} col={12} />
                </div>
              </BorrowPanel>
            }
            { mode === Mode.NotConnected &&
              <CollateralPanel {...{ chainId, mode, borrowApr, collaterals }} />
            }
            { mode === Mode.FarmingBaseToken &&
              <>
                  { amount.isEqualTo(Zero) ?
                    <CollateralPanel {...{ chainId, mode, borrowApr, collaterals }} />
                  : (
                    <BorrowPanel {...{ mode, borrowApr }}>
                      <WarningLabel>You cannot supply and borrow {token?.symbol} at the same time</WarningLabel>
                    </BorrowPanel>
                  )}
              </>
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
                <WarningLabel>Minimum borrow amount : <Amount value={minBorrowAmount} /> { token?.symbol }</WarningLabel>
              </BorrowPanel>
            }
            { mode === Mode.ReadyToBorrow &&
              <BorrowPanel {...{ mode, borrowApr }}>
                <div className="mb-1">
                  <Link href='#' onClick={handleMaxBorrow} className="text-decoration-none text-body">Maximum borrowing : <span className="text-body-tertiary">
                  <PriceAsync asyncPrice={fromUseQueryAsync(asyncBorrowCapacity)} /></span>
                  </Link>
                </div>
                <Link href={`${Path.Borrow}/collateral`} className="text-decoration-none" style={{ fontSize: '95%' }}>
                  Increase your borrowing capacity <i className="bi bi-arrow-right"></i>
                </Link>
              </BorrowPanel>
            }
            <div className="d-grid">
                { mode === Mode.NotConnected ? (
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={() => openWeb3Modal()}>Connect Wallet</button>
                  ) : mode === Mode.Loading ? (
                    <button className="btn btn-lg btn-primary text-white" type="button" disabled>Loading <SmallSpinner /></button>
                  ) : mode === Mode.ReadyToBorrow && amount.isGreaterThan(0) ? (
                    <button className="btn btn-lg btn-primary text-white" type="button" onClick={() => handleBorrow()}>Borrow {token?.symbol}</button>
                  ) : (
                    <button className="btn btn-lg btn-primary text-white" type="button">Borrow {token?.symbol}</button>
                  )
                }
            </div>
          </div>
          <SelectTokenToBorrow onSelect={setCurrentMarket} />
          <BorrowErc20Token  {...borrowInfo} />
          <BorrowNativeCurrency  {...borrowInfo} />
          <ActionResult {...{ ...borrowResult, onSuccess: resetAmount }} />
        </div>
        <div className="col-12 col-lg-3 px-0 pt-4 pt-lg-0">
          { isConnected && 
            <>
              <BorrowPositions /> 
              <TotalCollaterals /> 
            </>
          }
        </div>
      </>
    )
}

function BorrowPanel({ children, mode, borrowApr, css = ''} : { children: ReactNode, mode: Mode; borrowApr: number; css?: string }) {
  return (
    <div className={`d-flex flex-wrap justify-content-between align-items-center mb-4 pt-1 ${css}`}>
      <div>{ children }</div>
      <div className="my-2 my-sm-0">
        <div className="px-2 py-1 me-1 shadow-sm rounded small">
          { mode === Mode.Loading ? 
            (
              <div style={{ width: '6.5rem'}}>
                <PlaceHolder size={PlaceHolderSize.SMALL} col={12} />
              </div>
            ) : (
              <>Borrow APR : <span className="text-body-tertiary"><Apr value={borrowApr} /></span>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

function CollateralPanel({ chainId, mode, borrowApr, collaterals }) {
  return (
    <BorrowPanel {...{ mode, borrowApr, css: 'pb-2' }}>
      <Link href={`${Path.Borrow}/collateral`} className="text-decoration-none text-body">
        <div className="d-flex align-items-center">
          <span style={{ fontSize: '110%', marginRight: '0.4rem' }}>
          { collaterals.length > 1 ? 'Collaterals' : 'Collateral' }
          </span>
          { collaterals.map(collateral =>
            <span key={collateral.token.address} className="text-body-tertiary ps-2">
              <TokenIcon symbol={getTokenOrNativeCurrency(chainId, collateral.token)?.symbol} width="28" />
            </span>
          )}
        </div>
      </Link>
    </BorrowPanel>
  )
}

function TotalCollaterals() {
  const asyncCollateralPositions = useCollateralPositions()
  const { isPending, isLoading, isSuccess, data: totalCollateral } = useTotalCollateralUsdByChain({ asyncCollateralPositions })
  
  return isSuccess && totalCollateral.gt(Zero) && (
    <Link href={`${Path.Borrow}/collateral`} className="text-decoration-none">
      <p className="text-body text-center mb-4" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
        <span className="pe-3">Your collaterals :</span>
        {(isPending || isLoading) ? (
            <PlaceHolder size={PlaceHolderSize.NORMAL} col={2} />
          ) : isSuccess ? (
            <span className="text-body-secondary"><Price value={totalCollateral} /> <i className="ms-2 bi bi-box-arrow-up-right"></i></span>
          ) : (
            <span className="text-body-secondary"><NoData /></span>
        )}
      </p>
    </Link>
  )
}

function WarningLabel({ children }) {
  return (
    <div className="bg-warning-subtle text-warning-emphasis px-2 py-2 rounded-3" style={{ fontSize: '92%' }}>
    { children }
    </div>
  )
}
  