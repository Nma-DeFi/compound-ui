import Head from "next/head"
import Link from "next/link"
import { Path } from "../../components/Layout"
import { useBootstrap } from "../../hooks/useBootstrap"
import SelectTokenToBorrow, { SELECT_TOKEN_TO_BORROW_MODAL } from "../../components/pages/borrow/SelectTokenToBorrow"
import { useEffect, useState } from "react"
import TokenIcon from "../../components/TokenIcon"
import { getBaseTokenOrNativeCurrency, getPriceFeedKind } from "../../utils/markets"
import { useCurrentChain } from "../../hooks/useCurrentChain"
import { Zero, bn, bnf } from "../../utils/bn"
import { baseTokePriceFeed, cometProxy, netBorrowAprScaled } from "../../selectors/market-selector"
import { useMarkets } from "../../hooks/useMarkets"
import css from '../../styles/pages/Borrow.module.scss'
import AmountInput from "../../components/AmountInput"
import { useCurrentAccount } from "../../hooks/useCurrentAccount"
import { useSupplyPositions } from "../../hooks/useSupplyPositions"
import { useBorrowCapacity } from "../../hooks/useBorrowCapacity"
import BigNumber from "bignumber.js"
import PriceAsync from "../../components/PriceAsync"
import PriceFromFeed from "../../components/PriceFromFeed"
import { PriceFeed } from "../../types"
import { usePriceFromFeed } from "../../hooks/usePriceFromFeed"
import { usePublicClient } from "wagmi"
import { AsyncBigNumber, IdleData, LoadingData, SuccessData } from "../../utils/async"

const enum Mode {
  NotConnected,
  FarmingBaseToken,
  InsufficientBorrowCapacity,
  ReadyToBorrow,
}

export default function Borrow() {

    const [ mode, setMode ] = useState<Mode>()
    const [ amount, setAmount ] = useState<BigNumber>(Zero)
    const [ amountUsd, setAmountUsd ] = useState<AsyncBigNumber>(IdleData)
    const [ selectedMarket, setSelectedMarket ] = useState(null)
    const [ priceFeed, setPriceFeed ] = useState<PriceFeed>()

    const { isConnected } = useCurrentAccount()

    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const { isSuccess: isMarkets, data: markets } = useMarkets({ chainId })

    const { isSuccess: isSupplyPositions, data: supplyPositions } = useSupplyPositions()
    
    const asyncBorrowCapacity  =  useBorrowCapacity({ isConnected, chainId, publicClient, marketId: cometProxy(selectedMarket) })
    
    const { isSuccess: isBorrowCapacity, data: borrowCapacity } = asyncBorrowCapacity

    const { isLoading: isLoadingPrice, isSuccess: isSuccessPrice, data: price } = usePriceFromFeed({ chainId, publicClient, priceFeed })

    useEffect(() => {
      if (isLoadingPrice) {
        setAmountUsd(LoadingData)
      } else if (isSuccessPrice)  {
        setAmountUsd(SuccessData(amount.times(price)))
      } else {
        setAmountUsd(IdleData)
      }
  }, [isLoadingPrice, isSuccessPrice, amount])

    const { openModal } = useBootstrap()

    useEffect(() => { 
      if (!selectedMarket) return
      if (isConnected && (!isSupplyPositions || !isBorrowCapacity || !amountUsd.isSuccess)) return
      if (!isConnected) {
        setMode(Mode.NotConnected)
      } else if (isFarmingBaseToken()) {
        setMode(Mode.FarmingBaseToken)
      } else if (isInsufficientBorrowCap()) {
        setMode(Mode.InsufficientBorrowCapacity)
      } else {
        setMode(Mode.ReadyToBorrow)
      }
    })
    
    useEffect(() => {
      if (isMarkets) {
        setSelectedMarket(markets[0])
      }
    }, [chainId, markets])

    useEffect(() => {
      if (selectedMarket) {
        setAmount(Zero)
        setInput(null)
        setPriceFeed({
          address: baseTokePriceFeed(selectedMarket),
          kind: getPriceFeedKind(selectedMarket, chainId),
        })
      }
    }, [chainId, selectedMarket])

    function isFarmingBaseToken() {
      const comet = cometProxy(selectedMarket)
      return supplyPositions[comet].supplyBalance.isGreaterThan(Zero)
    }

    function isInsufficientBorrowCap() {
      return borrowCapacity.isEqualTo(Zero) || borrowCapacity.isLessThan(amountUsd.data)
    }
    
    function handleAmountChange(event) {
      const amount = bn(event.target.value || 0)
      setAmount(amount)
    }

    function setInput(value: string) {
      const elem = document.getElementById(css['borrow-input']) 
      const input = elem as HTMLInputElement
      input.value = value ?? ''
    }

    return ( 
      <>
        <Head>
          <title>Borrow</title>
        </Head>
        <SelectTokenToBorrow onSelect={setSelectedMarket} />
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
                      <PriceAsync asyncPrice={amountUsd} />
                    </small>
                </div>
                <button type="button" className="btn btn-lg btn-light border border-light-subtle rounded-5" onClick={() => openModal(SELECT_TOKEN_TO_BORROW_MODAL)}>
                    <div className="d-flex align-items-center">
                        <TokenIcon symbol={getBaseTokenOrNativeCurrency(selectedMarket, chainId)?.symbol} css="me-2 me-sm-3" width="35" />
                        <span className="me-2 me-sm-3">{getBaseTokenOrNativeCurrency(selectedMarket, chainId)?.symbol}</span> 
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </button>
            </div>
            <div className="d-flex flex-wrap justify-content-between mb-4">
                <div>
                { mode === Mode.NotConnected &&
                  <>
                    Connect your wallet
                  </>
                }
                { mode === Mode.FarmingBaseToken &&
                  <>
                    Cannot supply and borrow at the same time
                  </>
                }
                { mode === Mode.InsufficientBorrowCapacity &&
                  <>
                  <div className="mb-1">
                    { borrowCapacity?.isEqualTo(Zero) ?
                      <>No borrowing capacity</>
                    :
                      <>Insufficient borrowing capacity</>
                    }
                    </div>
                    <Link href={`${Path.Borrow}/collateral`} className="text-decoration-none">Add collateral <i className="bi bi-arrow-right"></i></Link>
                  </>
                }
                { mode === Mode.ReadyToBorrow &&
                  <>
                    <div className="mb-1">Maximum borrowing : <span className="text-body-tertiary">
                      <PriceAsync asyncPrice={{ 
                        isIdle: asyncBorrowCapacity.isError, 
                        isLoading: asyncBorrowCapacity.isLoading, 
                        isSuccess: asyncBorrowCapacity.isSuccess, 
                        isError: asyncBorrowCapacity.isError, 
                        data: asyncBorrowCapacity.data 
                      }} /></span></div>
                    <Link href={`${Path.Borrow}/collateral`} className="text-decoration-none">Increase your borrowing capacity <i className="bi bi-arrow-right"></i></Link>
                  </>
                }
                </div>
                <div className="d-flex align-items-start my-2 my-sm-0">
                    <small className="px-2 py-1 me-1 shadow-sm rounded">Borrow APR : <span className="text-body-tertiary">{bnf(netBorrowAprScaled(selectedMarket))}<small>%</small></span></small>
                </div>
            </div>
            <div className="d-grid">
                <button className="btn btn-lg btn-primary text-white" type="button">Borrow USDC</button>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-xxl-2">
          {/*<div className="bg-body p-3 rounded border shadow">
            <h4 className="mb-4">Your positions</h4>
            <table className="table table-borderless align-middle">
                <tbody>
                  <tr>
                    <td className="w-50">
                        <div className="d-flex justify-content-start">
                            <img src="/images/tokens/USDC.svg" alt="USDC" width="35" />
                            <div className="ps-2">
                                <div>520 <small className="text-body-secondary">USDC</small></div>
                                <div className="small text-body-secondary">$520</div>
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="small">Liquidation risk</div> 
                        <div className="text-warning">67.23%</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-50">                                
                        <button type="button" className="btn btn-light border border-light-subtle w-100">Repay</button>
                    </td>
                    <td className="text-center">
                        <div className="small">Borrow APR</div> 
                        <div className="text-body-secondary">4.12%</div>
                    </td>
                  </tr>
                </tbody>
            </table>
            <hr className="mx-2 text-body-tertiary" />
            <table className="table table-borderless align-middle">
                <tbody>
                  <tr>
                    <td className="w-50">
                        <div className="d-flex justify-content-start">
                            <img src="/images/tokens/ETH.svg" alt="ETH" width="35" />
                            <div className="ps-2">
                                <div>3 <small className="text-body-secondary">ETH</small></div>
                                <div className="small text-body-secondary">$4800</div>
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="small">Liquidation risk</div> 
                        <div className="text-success">12.32%</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-50">                                
                        <button type="button" className="btn btn-light border border-light-subtle w-100">Repay</button>
                    </td>
                    <td className="text-center">
                        <div className="small">Borrow APR</div> 
                        <div className="text-body-secondary">4.34%</div>
                    </td>
                  </tr>
                </tbody>
            </table>
          </div>
          <p className="h6 p-3 pt-4">
            Your collaterals : <span className="ps-2 text-body-secondary">$896 <i className="bi bi-box-arrow-up-right"></i></span>
          </p>*/}
        </div>
      </>
    )
}
  