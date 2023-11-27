import Head from "next/head";
import { useEffect, useState } from "react";
import UserAccount from "../../components/UserAccount";

export default function Farm() {

  const [ tokens, setTokens ] = useState([]);    

  useEffect(() => {
    const tokenList = [
      {
        symbol: 'USDC',
        name: 'USD Coin',
        address: '1'
      },
      {
        symbol: 'ETH',
        name: 'Ether',
        address: '2'
      },
      {
        symbol: 'COMP',
        name: 'Compound',
        address: '3'
      }
    ];
    setTokens(tokenList);
  }, []);

  return ( 
      <>
        <Head>
          <title>Farm</title>
        </Head>
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

            {tokens.map(token => 
              <div key={token.address} className="row g-0 align-items-center p-3 mb-4 bg-body border rounded shadow">
                  <div className="col p-0">
                      <div className="d-flex justify-content-start">
                          <img src={`/images/tokens/${token.symbol}.svg`} className="d-none d-sm-block me-2" alt="USDC" width="42" />
                          <div>
                              <div className="mb-1">{token.symbol}</div>
                              <small className="d-none d-sm-block text-body-secondary">{token.name}</small>
                          </div>
                      </div>
                  </div>
                  <div className="col text-center d-none d-md-block">
                      <div className="mb-1">731.86M</div>
                      <small className="text-body-secondary">$731.86M</small>
                  </div>
                  <div className="col text-center">
                      <div className="mb-1">1.61K</div>
                      <small className="text-body-secondary">$1.60K</small>
                  </div>
                  <div className="col text-center">
                    7.12<small className="text-body-secondary">%</small> <i className="bi bi-info-square text-body-tertiary ms-1 d-none d-sm-inline"></i>
                  </div>
                  <div className="col p-0">
                      <div className="d-flex flex-column">
                          <button type="button" className="btn btn-primary text-white mb-2">Deposit</button>
                          <button type="button" className="btn btn-primary text-white">Withdraw</button>
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
  