import { useEffect } from "react";
import css from '../../styles/components/farm/Withdraw.module.scss';

export const WITHDRAW_MODAL = 'withdraw';

export default function Withdraw(market) {

    useEffect(() => {
      console.log('Withdraw Market', market); 
    }, [market]);

    return (
        <div id={WITHDRAW_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['withdraw-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Withdraw</h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['withdraw-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                        <input id={css['withdraw-input']} type="number" autoComplete="off" placeholder="0" min="0" step="any" />
                        <div className="small text-body-tertiary">$0.00</div>
                      </div>
                      <div>
                          <button type="button" className="btn btn-light border border-light-subtle rounded-4 mb-2">
                              <div className="d-flex align-items-center">
                                  <img src={`/images/tokens/${market.configuration?.baseToken.token.symbol}.svg`} alt="USDC" width="30" /> 
                                  <span className="px-3">{market.configuration?.baseToken.token.symbol}</span> 
                              </div>
                          </button>
                          <div className="text-center text-body-secondary small">Wallet : <span className="text-body-tertiary">$1.43K</span></div>
                      </div>
                  </div>
                  <div className="row g-2">
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100">25%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100">50%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100">75%</button></div>
                      <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100">Max</button></div>
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-lg btn-primary text-white" type="button">Withdraw {market.configuration?.baseToken.token.symbol}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}