import { useCurrentChain } from "../../../hooks/useCurrentChain"
import { useMarkets } from "../../../hooks/useMarkets"
import { getBaseTokenOrNativeCurrency } from "../../../utils/markets"
import { GrowSpinners } from "../../Spinner"
import TokenIcon from "../../TokenIcon"
import css from '../../../styles/components/borrow/SelectTokenToBorrow.module.scss'
import { collateralTokens, netBorrowAprScaled } from "../../../selectors/market-selector"
import { getTokenOrNativeCurrency } from "../../../utils/chains"
import { bnf } from "../../../utils/bn"
import { useBootstrap } from "../../../hooks/useBootstrap"

export const SELECT_TOKEN_TO_BORROW_MODAL = 'select-token-to-borrow'

export default function SelectTokenToBorrow({ onSelect }) {

  const { currentChainId: chainId } = useCurrentChain()
  const { isLoading, isError, isSuccess, data: markets } = useMarkets({ chainId })

  const { hideModal } = useBootstrap()

  function handleSelect(market) {
    onSelect(market)
    hideModal(SELECT_TOKEN_TO_BORROW_MODAL)
  }

  return (
    <div id={SELECT_TOKEN_TO_BORROW_MODAL} className="modal p-0" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body pb-5">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="m-0">Borrow token</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            { isError &&
              <p className="p-3">Data currently unavailable</p>
            }

            { isLoading && 
              <GrowSpinners nb={3} css="d-flex justify-content-center py-5" />
            }

            { isSuccess && markets.map((market) =>
              <div key={market.id} className={`bg-body shadow rounded px-3 px-sm-4 py-3 mx-1 mx-sm-2 mt-5 ${css['item-hover']}`} onClick={() => handleSelect(market)}>
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex justify-content-start">
                        <TokenIcon symbol={getBaseTokenOrNativeCurrency(market, chainId).symbol} width="45" />
                        <div className="ps-3">
                            <div className="fs-4">{getBaseTokenOrNativeCurrency(market, chainId).symbol}</div>
                            <small className="text-body-secondary">{getBaseTokenOrNativeCurrency(market, chainId).name}</small>
                        </div>
                    </div>
                    <div>
                        <div className="text-body-secondary">Borrow APR</div> 
                        <div className="text-body-tertiary text-center">{bnf(netBorrowAprScaled(market))}<small>%</small></div>
                    </div>
                </div>

                <div className="d-flex flex-wrap justify-content-center align-items-center small">
                    <div className="pe-1 text-body-secondary">Collaterals</div> 
                    <div className="d-flex flex-wrap text-body-tertiary">
                        {collateralTokens(market).map((collateral, index) =>
                          <div key={index} className={`${collateralTokens(market).length === (index + 1) ? '' : 'border-end'} px-2`}>
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