import Head from "next/head"
import UserAccount from "../../components/UserAccount"
import { bnf } from "../../utils/bn"
import { nf } from "../../utils/number"
import { useState } from "react"
import { useBootstrap } from "../../hooks/useBootstrap"
import { connect } from "react-redux"
import { RootState } from '../../redux/types'
import Withdraw, { WITHDRAW_MODAL } from "../../components/farm/Withdraw"
import Deposit, { DEPOSIT_MODAL } from "../../components/farm/Deposit"

const Action = { Deposit: 0, Withdraw: 1 }

export function Farm({ status, markets }) {

  const [ targetMarket, setTargetMarket ] = useState(null)
  const { openModal } = useBootstrap()

  function showModal(market, action) {
    setTargetMarket(market)
    openModal(action === Action.Deposit ? DEPOSIT_MODAL : WITHDRAW_MODAL)
  }

  return ( 
      <>
        <Head>
          <title>Farm</title>
        </Head>
        
        <Deposit {...targetMarket} />
        <Withdraw {...targetMarket} />
        
        <div className="col-8 px-5">
            <div className="row g-0 align-items-center p-4 mb-5 bg-body border rounded shadow mb-5">
                <div className="col-12 col-sm-4"><h2 className="mb-3 mb-sm-0">Farm</h2></div>
                <div className="col-12 col-sm-8 text-start text-sm-end text-body-tertiary fs-5">Deposit your assets and earn fees</div>
            </div>

            <div className="row g-0 text-body-secondary px-3 mb-3">
                <div className="col text-start">Asset</div>
                <div className="col text-center d-none d-md-block">Total deposits</div>
                <div className="col text-center">Your balance</div>                            
                <div className="col text-center">APR</div>
                <div className="col text-center">Action</div>
            </div>

            { status === 'loading' && <div className="text-body-tertiary">Loading ...</div> }

            { status === 'success' && markets.map(m =>
              <div key={m.configuration.baseToken.token.address} className="row g-0 align-items-center p-3 mb-4 bg-body border rounded shadow">
                  <div className="col p-0">
                      <div className="d-flex justify-content-start">
                          <img src={`/images/tokens/${m.configuration.baseToken.token.symbol}.svg`} className="d-none d-sm-block me-2" alt="USDC" width="42" />
                          <div>
                              <div className="mb-1">{m.configuration.baseToken.token.symbol}</div>
                              <small className="d-none d-sm-block text-body-secondary">{m.configuration.baseToken.token.name}</small>
                          </div>
                      </div>
                  </div>
                  <div className="col text-center d-none d-md-block">
                      <div className="mb-1">{bnf(m.accounting.totalBaseSupplyScaled)}</div>
                      <small className="text-body-secondary">${bnf(m.accounting.totalBaseSupplyUsd)}</small>
                  </div>
                  <div className="col text-center">
                  {m.userPosition ? (
                    <>
                      <div className="mb-1">{bnf(m.userPosition.balance)}</div>
                      <small className="text-body-secondary">${bnf(m.userPosition.balanceUsd)}</small>
                    </>
                    ) : (
                    <>
                      <div className="mb-1">—</div>
                      <small className="text-body-secondary">—</small>
                    </>
                  )}
                  </div>
                  <div className="col text-center">
                  {nf(m.accounting.netSupplyAprScaled)}<small className="text-body-secondary">%</small> <i className="bi bi-info-square text-body-tertiary ms-1 d-none d-sm-inline"></i>
                  </div>
                  <div className="col p-0">
                      <div className="d-flex flex-column">
                          <button type="button" className="btn btn-primary text-white mb-2" onClick={() => showModal(m, Action.Deposit)}>Deposit</button>
                          <button type="button" className="btn btn-primary text-white" onClick={() => showModal(m, Action.Withdraw)}>Withdraw</button>
                      </div>
                  </div>
              </div>
            )}
        </div>

        <div className="col-12 col-xl-2">
          <UserAccount />
        </div>
      </>
    );
}

const mapStateToProps = (state: RootState) => state.marketData

export default connect(mapStateToProps)(Farm)