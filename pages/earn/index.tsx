import Head from "next/head"
import { useEffect, useState } from "react"
import { GrowSpinners } from "../../components/Spinner"
import SupplyApr from "../../components/SupplyApr"
import SupplyBalance, { SupplyBalance2 } from "../../components/SupplyBalance"
import UserAccount from "../../components/UserAccount"
import WithdrawBaseTokenErc20, { WITHDRAW_BASE_TOKEN_ERC20_MODAL } from "../../components/pages/earn/WithdrawBaseTokenErc20"
import WithdrawBaseTokenNative, { WITHDRAW_BASE_TOKEN_NATIVE_MODAL } from "../../components/pages/earn/WithdrawBaseTokenNative"
import { useBootstrap } from "../../hooks/useBootstrap"
import { useCurrentChain } from "../../hooks/useCurrentChain"
import { useMarkets } from "../../hooks/useMarkets"
import { baseTokenAddress, totalBaseSupplyScaled, totalBaseSupplyUsd } from "../../selectors/market-selector"
import { bn } from "../../utils/bn"
import { isNativeCurrencyMarket, getBaseTokenOrNativeCurrency } from "../../utils/markets"
import { useSupplyPositions } from "../../hooks/useSupplyPositions"
import { useCurrentAccount } from "../../hooks/useCurrentAccount"
import css from '../../styles/pages/Farm.module.scss'
import TokenIcon from "../../components/TokenIcon"
import DepositBaseTokenErc20, { DEPOSIT_BASE_TOKEN_ERC20_MODAL } from "../../components/pages/earn/DepositBaseTokenErc20"
import DepositBaseTokenNative, { DEPOSIT_BASE_TOKEN_NATIVE_MODAL } from "../../components/pages/earn/DepositBaseTokenNative"
import { ActionInfo, ActionType } from "../../types"
import ActionResult from "../../components/action-result/ActionResult"
import { bna2 } from "../../components/Amount"
import Price from "../../components/Price"
import WarningMessage from "../../components/WarningMessage"

export default function Earn() {

  useSupplyPositions()

  const { isConnected } = useCurrentAccount()
  const { currentChainId: chainId } = useCurrentChain()
  const { isLoading, isError, isSuccess, data: markets } = useMarkets({ chainId })
  
  const [ earnActionInfo, setEarnActionInfo ] = useState(null)
  const [ earnActionResult, setEarnActionResult ] = useState<ActionInfo>()

  const { openModal } = useBootstrap()

  function showModal(market, action) {
    let modal
    if (action === ActionType.DepositBaseToken) {
      if (isNativeCurrencyMarket(market, chainId)) {
        modal = DEPOSIT_BASE_TOKEN_NATIVE_MODAL
      } else {
        modal = DEPOSIT_BASE_TOKEN_ERC20_MODAL
      }
    } else  {
      if (isNativeCurrencyMarket(market, chainId)) {
        modal = WITHDRAW_BASE_TOKEN_NATIVE_MODAL
      } else {
        modal = WITHDRAW_BASE_TOKEN_ERC20_MODAL
      }
    }
    setEarnActionInfo({ ...market, onAction: setEarnActionResult })
    openModal(modal)
  }

  useEffect(() => {
    document.getElementById(DEPOSIT_BASE_TOKEN_ERC20_MODAL).addEventListener('hide.bs.modal', () => setEarnActionInfo(null))
    document.getElementById(DEPOSIT_BASE_TOKEN_NATIVE_MODAL).addEventListener('hide.bs.modal', () => setEarnActionInfo(null))
    document.getElementById(WITHDRAW_BASE_TOKEN_ERC20_MODAL).addEventListener('hide.bs.modal', () => setEarnActionInfo(null))
    document.getElementById(WITHDRAW_BASE_TOKEN_NATIVE_MODAL).addEventListener('hide.bs.modal', () => setEarnActionInfo(null))
  }, [])

  return ( 
      <>       
        <div className="col-12 col-xl-8 px-0 px-xl-5">
          
            <DepositBaseTokenErc20 { ...earnActionInfo } />
            <DepositBaseTokenNative { ...earnActionInfo } />
            <WithdrawBaseTokenErc20 { ...earnActionInfo } />
            <WithdrawBaseTokenNative { ...earnActionInfo } />
            <ActionResult { ...earnActionResult } />

            <div className="row g-0 align-items-center p-4 mb-5 bg-body border rounded shadow mb-5">
                <div className="col-12 col-sm-4"><h2 className="mb-3 mb-sm-0">Earn</h2></div>
                <div className="col-12 col-sm-8 text-start text-sm-end text-body-tertiary fs-5">Deposit your assets and earn interest</div>
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
              <WarningMessage>Data currently unavailable</WarningMessage>
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
                      <div className="mb-1">{ bna2(totalBaseSupplyScaled(market)) }</div>
                      <small className="text-body-secondary"><Price value={ bn(totalBaseSupplyUsd(market)) } /></small>
                  </div>
                  { isConnected &&
                    <div className="col text-center">
                      <SupplyBalance2 market={market} />
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

        <div className="col-12 col-xl-2 px-0 pt-4 pt-xl-0">
          <UserAccount />
        </div>
      </>
    )
}

