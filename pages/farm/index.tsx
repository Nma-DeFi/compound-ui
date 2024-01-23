import Head from "next/head"
import UserAccount from "../../components/UserAccount"
import { bnf } from "../../utils/bn"
import { useEffect, useState } from "react"
import { useBootstrap } from "../../hooks/useBootstrap"
import { connect } from "react-redux"
import { RootState } from '../../redux/types'
import Withdraw, { WITHDRAW_MODAL } from "../../components/farm/Withdraw"
import Deposit, { DEPOSIT_MODAL } from "../../components/farm/Deposit"
import { baseTokenAddress, baseTokenName, baseTokenSymbol, netSupplyAprScaled, totalBaseSupplyScaled, totalBaseSupplyUsd } from "../../services/market-info-service"
import SupplyBalance from "../../components/SupplyBalance"
import { GrowSpinners } from "../../components/Spinner"

const Action = { Deposit: 0, Withdraw: 1 }

export function Farm({ status, markets }) {

  const [ targetMarket, setTargetMarket ] = useState(null)
  const { openModal } = useBootstrap()

  function showModal(market, action) {
    setTargetMarket(market)
    openModal(action === Action.Deposit ? DEPOSIT_MODAL : WITHDRAW_MODAL)
  }
  
  useEffect(() => {
    document.getElementById(DEPOSIT_MODAL).addEventListener('hide.bs.modal', () => setTargetMarket(null))
    document.getElementById(WITHDRAW_MODAL).addEventListener('hide.bs.modal', () => setTargetMarket(null))
  }, [])

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

            { status === 'loading' && 
              <GrowSpinners css='py-5' />
            }

            { status === 'success' && markets.map(market =>
              <div key={baseTokenAddress(market)} className="row g-0 align-items-center p-3 mb-4 bg-body border rounded shadow">
                  <div className="col p-0">
                      <div className="d-flex justify-content-start">
                          <img src={`/images/tokens/${baseTokenSymbol(market)}.svg`} className="d-none d-sm-block me-2" alt="USDC" width="42" />
                          <div>
                              <div className="mb-1">{baseTokenSymbol(market)}</div>
                              <small className="d-none d-sm-block text-body-secondary">{baseTokenName(market)}</small>
                          </div>
                      </div>
                  </div>
                  <div className="col text-center d-none d-md-block">
                      <div className="mb-1">{bnf(totalBaseSupplyScaled(market))}</div>
                      <small className="text-body-secondary">${bnf(totalBaseSupplyUsd(market))}</small>
                  </div>
                  <div className="col text-center">
                    <SupplyBalance {...market} />
                  </div>
                  <div className="col text-center">
                  {bnf(netSupplyAprScaled(market))}<small className="text-body-secondary">%</small> <i className="bi bi-info-square text-body-tertiary ms-1 d-none d-sm-inline"></i>
                  </div>
                  <div className="col p-0">
                      <div className="d-flex flex-column">
                          <button type="button" className="btn btn-primary text-white mb-2" onClick={() => showModal(market, Action.Deposit)}>Deposit</button>
                          <button type="button" className="btn btn-primary text-white" onClick={() => showModal(market, Action.Withdraw)}>Withdraw</button>
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