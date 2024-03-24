export default function BorrowPositions() {

    return (
        <div className="bg-body p-3 rounded border shadow">
            <h4 className="mb-4">Your borrowings</h4>
            <table className="table table-borderless align-middle">
                <tbody>
                  <tr>
                    <td className="w-50">
                        <div className="d-flex justify-content-start">
                            <img src="/images/tokens/USDC.svg" alt="USDC" width="35" />
                            <div className="ps-2">
                                <div>520 <small className="text-body-secondary">USDC</small></div>
                                <div className="small text-body-secondary">$520</div>
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="small">Liquidation risk</div> 
                        <div className="progress mx-2" role="progressbar" aria-label="Risk" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} style={{ marginTop: '0.4rem'}}  title="Liquidation risk : 67%">
                            <div className="progress-bar text-bg-warning" style={{ width: '67%'}}>67%</div>
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-50">                                
                        <button type="button" className="btn btn-light border border-light-subtle w-100"><i className="bi bi-box-arrow-in-down me-1"></i> Repay</button>
                    </td>
                    <td className="text-center">
                        <div className="small">Borrow APR</div> 
                        <div className="text-body-secondary">4.12%</div>
                    </td>
                  </tr>
                </tbody>
            </table>
            <hr className="mx-2 text-body-tertiary" />
            <table className="table table-borderless align-middle">
                <tbody>
                  <tr>
                    <td className="w-50">
                        <div className="d-flex justify-content-start">
                            <img src="/images/tokens/ETH.svg" alt="ETH" width="35" />
                            <div className="ps-2">
                                <div>3 <small className="text-body-secondary">ETH</small></div>
                                <div className="small text-body-secondary">$4800</div>
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="small">Liquidation risk</div> 
                        <div className="progress mx-2" role="progressbar" aria-label="Risk" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ marginTop: '0.4rem'}} title="Liquidation risk : 25%">
                            <div className="progress-bar text-bg-success" style={{ width: '25%'}}></div>
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-50">                                
                        <button type="button" className="btn btn-light border border-light-subtle w-100"><i className="bi bi-box-arrow-in-down me-1"></i> Repay</button>
                    </td>
                    <td className="text-center">
                        <div className="small">Borrow APR</div> 
                        <div className="text-body-secondary">4.34%</div>
                    </td>
                  </tr>
                </tbody>
            </table>
        </div>
    )
}