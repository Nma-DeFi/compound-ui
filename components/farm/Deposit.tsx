import { useCurrentChain } from '../../hooks/useCurrentChain'
import { useErc20 } from '../../hooks/useErc20'
import css from '../../styles/components/farm/Deposit.module.scss'
import { useEffect } from 'react'
import { useCurrentAccount } from '../../hooks/useCurrentAccount'

export const DEPOSIT_MODAL = 'deposit'

export default function Deposit(market) {

    const erc20Contract = market.configuration?.baseToken.token.address
    
    const { isConnected, address } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()
    const { balanceOf, totalSupply } = useErc20({ chainId, erc20Contract })
    
    useEffect(() => {
      totalSupply?.().then(console.log)
      if (isConnected) {
        balanceOf?.(address).then(console.log)
      }
    }, [totalSupply, balanceOf])

    return (
        <div id={DEPOSIT_MODAL} className="modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div id={css['deposit-body']} className="modal-body">
                <div className="d-flex align-items-center">
                  <h2 className="me-auto mb-0">Deposit</h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id={css['deposit-form']}>
                  <div className="d-flex border p-3 rounded mb-2">
                      <div className="flex-grow-1">
                        <input id={css['deposit-input']} type="number" autoComplete="off" placeholder="0" min="0" step="any" />
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
                  <button className="btn btn-lg btn-primary text-white" type="button">Deposit {market.configuration?.baseToken.token.symbol}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}