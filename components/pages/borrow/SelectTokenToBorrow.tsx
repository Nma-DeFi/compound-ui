import { useCurrentChain } from "../../../hooks/useCurrentChain"
import { useMarkets } from "../../../hooks/useMarkets"
import { getBaseTokenOrNativeCurrency } from "../../../utils/markets"
import { GrowSpinners } from "../../Spinner"
import TokenIcon from "../../TokenIcon"
import css from '../../../styles/components/borrow/SelectTokenToBorrow.module.scss'
import { collateralTokens } from "../../../selectors/market-selector"
import { getTokenOrNativeCurrency } from "../../../utils/chains"

export const SELECT_TOKEN_TO_BORROW_MODAL = 'select-token-to-borrow'

export default function SelectTokenToBorrow() {

  const { currentChainId: chainId } = useCurrentChain()
  const { isLoading, isError, isSuccess, data: markets } = useMarkets({ chainId })

    return (
      <div id={SELECT_TOKEN_TO_BORROW_MODAL} className="modal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Select token</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body py-0">

              { isError &&
                <p className="p-3">Data currently unavailable</p>
              }

              { isLoading && 
                <GrowSpinners nb={3} css="d-flex justify-content-center py-5" />
              }

              { isSuccess && markets.map(market =>
                <div className={`bg-body shadow rounded px-4 py-3 mx-2 my-5 ${css['item-hover']}`}>
                  <div className="d-flex justify-content-between align-items-center mb-5">
                      <div className="d-flex justify-content-start">
                          <TokenIcon symbol={getBaseTokenOrNativeCurrency(market, chainId).symbol} width="42" />
                          <div className="ps-3">
                              <div className="fs-5">{getBaseTokenOrNativeCurrency(market, chainId).symbol}</div>
                              <small className="text-body-secondary">{getBaseTokenOrNativeCurrency(market, chainId).name}</small>
                          </div>
                      </div>
                      <div>
                          <div className="text-body-secondary">Borrow APR</div> 
                          <div className="text-body-tertiary text-center">7.39<small>%</small></div>
                      </div>
                  </div>

                  <div className="d-flex flex-wrap justify-content-center align-items-center small">
                      <div className="me-1  text-body-secondary">Collaterals</div> 
                      <div className={`d-flex flex-wrap text-body-tertiary py-1 ${css['collateral-list']}`}>
                          {collateralTokens(market).map((collateral, index) =>
                            <div className={`${collateralTokens(market).length === (index + 1) ? '' : 'border-end'} px-2`}>
                              {getTokenOrNativeCurrency(chainId, collateral.token).symbol}
                            </div>
                          )}
                      </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    )
}