import css from '../../styles/components/farm/Supply.module.scss';

export const SUPPLY_MODAL = 'supply';

export default function Supply(market) {

    return (
        <div id={SUPPLY_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Supply</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div id={css['supply-body']} className="modal-body">
                <div className="d-flex border p-3 rounded mb-2">
                    <div className="flex-grow-1">
                        <input id={css['supply-input']} type="number" autoComplete="off" placeholder="0" min="0" step="any" />
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
              <div className="modal-footer">
                <button className="btn btn-lg btn-primary text-white w-100" type="button">Supply {market.configuration?.baseToken.token.symbol}</button>
              </div>
            </div>
          </div>
        </div>
    );
}