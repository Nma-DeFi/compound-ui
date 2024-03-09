import Head from "next/head"
import { useEffect, useState } from "react"
import { GrowSpinners } from "../../components/Spinner"
import SupplyApr from "../../components/SupplyApr"
import SupplyBalance from "../../components/SupplyBalance"
import UserAccount from "../../components/UserAccount"
import { DEPOSIT_ERC20_TOKEN_MODAL } from "../../components/deposit/DepositErc20Token"
import { DEPOSIT_NATIVE_CURRENCY_MODAL } from "../../components/deposit/DepositNativeCurrency"
import WithdrawBaseTokenErc20 from "../../components/pages/farm/WithdrawBaseTokenErc20"
import WithdrawBaseTokenNative from "../../components/pages/farm/WithdrawBaseTokenNative"
import { useBootstrap } from "../../hooks/useBootstrap"
import { useCurrentChain } from "../../hooks/useCurrentChain"
import { useMarkets } from "../../hooks/useMarkets"
import { baseTokenAddress, totalBaseSupplyScaled, totalBaseSupplyUsd } from "../../selectors/market-selector"
import { bnf } from "../../utils/bn"
import { isNativeCurrencyMarket, getBaseTokenOrNativeCurrency } from "../../utils/markets"
import { useSupplyPositions } from "../../hooks/useSupplyPositions"
import { useAppDispatch } from "../../redux/hooks"
import { supplyPositionsInit } from "../../redux/slices/positions/supplyPositions"
import { useCurrentAccount } from "../../hooks/useCurrentAccount"
import css from '../../styles/pages/Farm.module.scss'
import TokenIcon from "../../components/TokenIcon"
import DepositBaseTokenErc20 from "../../components/pages/farm/DepositBaseTokenErc20"
import DepositBaseTokenNative from "../../components/pages/farm/DepositBaseTokenNative"
import { WITHDRAW_NATIVE_CURRENCY_MODAL } from "../../components/withdraw/WithdrawNativeCurrency"
import { WITHDRAW_ERC20_TOKEN_MODAL } from "../../components/withdraw/WithdrawErc20Token"
import { ActionType } from "../../types"

export default function Farm() {

  const { isConnected } = useCurrentAccount()
  const { currentChainId: chainId } = useCurrentChain()
  const { isLoading, isError, isSuccess, data: markets } = useMarkets({ chainId })
  const { isIdle: isNoSupplyPositions } = useSupplyPositions()

  const dispatch = useAppDispatch()

  const [ targetMarket, setTargetMarket ] = useState(null)
  const { openModal } = useBootstrap()

  useEffect(() => { 
    if (isConnected && isNoSupplyPositions) {
      dispatch(supplyPositionsInit())
    } 
  }, [isConnected, isNoSupplyPositions])

  function showModal(market, action) {
    let modal
    if (action === ActionType.DepositBaseToken) {
      if (isNativeCurrencyMarket(market, chainId)) {
        modal = DEPOSIT_NATIVE_CURRENCY_MODAL
      } else {
        modal = DEPOSIT_ERC20_TOKEN_MODAL
      }
    } else  {
      if (isNativeCurrencyMarket(market, chainId)) {
        modal = WITHDRAW_NATIVE_CURRENCY_MODAL
      } else {
        modal = WITHDRAW_ERC20_TOKEN_MODAL
      }
    }
    setTargetMarket(market)
    openModal(modal)
  }

  useEffect(() => {
    document.getElementById(DEPOSIT_ERC20_TOKEN_MODAL).addEventListener('hide.bs.modal', () => setTargetMarket(null))
    document.getElementById(DEPOSIT_NATIVE_CURRENCY_MODAL).addEventListener('hide.bs.modal', () => setTargetMarket(null))
    document.getElementById(WITHDRAW_ERC20_TOKEN_MODAL).addEventListener('hide.bs.modal', () => setTargetMarket(null))
    document.getElementById(WITHDRAW_NATIVE_CURRENCY_MODAL).addEventListener('hide.bs.modal', () => setTargetMarket(null))
  }, [])

  return ( 
      <>
        <Head>
          <title>Farm</title>
        </Head>
        
        <div className="col-12 col-xl-8 px-xl-5">

            <DepositBaseTokenErc20 {...targetMarket} />
            <DepositBaseTokenNative {...targetMarket} />
            <WithdrawBaseTokenErc20 {...targetMarket} />
            <WithdrawBaseTokenNative {...targetMarket} />

            <div className="row g-0 align-items-center p-4 mb-5 bg-body border rounded shadow mb-5">
                <div className="col-12 col-sm-4"><h2 className="mb-3 mb-sm-0">Farm</h2></div>
                <div className="col-12 col-sm-8 text-start text-sm-end text-body-tertiary fs-5">Deposit your assets and earn fees</div>
            </div>

            <div className="row g-0 text-body-secondary px-3 mb-3">
                <div className="col text-start">Asset</div>
                <div className="col text-center d-none d-md-block">Total deposits</div>
                { isConnected &&
                  <div className="col text-center">
                    <div className="d-inline d-sm-none">Balance</div>
                    <div className="d-none d-sm-inline">Your balance</div>
                  </div>                            
                }
                <div className="col text-center">APR</div>
                <div className="col text-center">Action</div>
            </div>

            { isError &&
              <p className="p-3">Data currently unavailable</p>
            }

            { isLoading && 
              <GrowSpinners css='py-5 d-flex justify-content-center' />
            }

            { isSuccess && markets.map(market =>
              <div key={baseTokenAddress(market)} className="row g-0 align-items-center p-3 mb-4 bg-body border rounded shadow">
                  <div className="col p-0">
                      <div className="d-flex justify-content-start">
                        { getBaseTokenOrNativeCurrency(market, chainId) &&
                          <>
                            <TokenIcon symbol={getBaseTokenOrNativeCurrency(market, chainId).symbol} css="d-none d-sm-block me-3" width="42" />
                            <div>
                                <div className="d-flex fs-5">
                                  {!isConnected &&
                                    <TokenIcon symbol={getBaseTokenOrNativeCurrency(market, chainId).symbol} css={`d-block d-sm-none ${css['token-icon-xs']}`} width="25" />
                                  }
                                  {getBaseTokenOrNativeCurrency(market, chainId).symbol}
                                </div>
                                <small className="d-none d-sm-block text-body-secondary">{getBaseTokenOrNativeCurrency(market, chainId).name}</small>
                            </div>
                          </>
                        }
                      </div>
                  </div>
                  <div className="col text-center d-none d-md-block">
                      <div className="mb-1">{bnf(totalBaseSupplyScaled(market))}</div>
                      <small className="text-body-secondary">${bnf(totalBaseSupplyUsd(market))}</small>
                  </div>
                  { isConnected &&
                    <div className="col text-center">
                      <SupplyBalance market={market} />
                    </div>
                  }
                  <div className="col text-center">
                    <SupplyApr market={market} />
                  </div>
                  <div className="col p-0">
                      <div className="d-flex flex-column">
                          <button type="button" className="btn btn-primary text-white mb-2" onClick={() => showModal(market, ActionType.DepositBaseToken)}>Deposit</button>
                          <button type="button" className="btn btn-primary text-white" onClick={() => showModal(market, ActionType.WithdrawBaseToken)}>Withdraw</button>
                      </div>
                  </div>
              </div>
            )}
        </div>

        <div className="col-12 col-xl-2">
          <UserAccount />
        </div>
      </>
    )
}

