import Head from "next/head"
import NoData from "../../components/NoData"
import css from '../../styles/pages/Claim.module.scss'
import { useEffect, useState } from "react"
import { orderedChainList } from "../../utils/chains"
import TokenIcon from "../../components/TokenIcon"

export default function Claim() {

    const [ chainList, setChainList ] = useState([])
    
    useEffect(() => {
        const chainList = orderedChainList()
        setChainList(chainList) 
    }, [])

    return ( 
        <>
            <Head>
                <title>Claim</title>
            </Head>
            <div className="col-12 col-lg-7 col-xxl-6 px-0 px-xl-5">
                <div className="bg-body p-4 pt-3 rounded border shadow">
                    <div className="d-flex justify-content-between mb-3">
                        <h2 className="m-0">Claim</h2>
                        <div className="small text-center">
                            <div className="fw-semibold mb-1">Total rewards</div> 
                            <div className="text-body-secondary"><NoData /></div>
                        </div>
                    </div>
                    <div id={ css['claim-accordion'] } className="accordion">
                    {chainList.map(chain => 
                        <div className="accordion-item" key={chain.id}>
                            <h2 className="accordion-header">
                                <button className={`accordion-button collapsed ${css['accordion-button-custom']}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    <div className="d-flex align-items-center me-auto">
                                        <img src={chain.icon} style={{ width: '1.8rem' }} alt="Ethereum" />
                                        <div className="fs-5 ms-3">{chain.shortName}</div>
                                    </div>
                                    <div className="d-flex align-items-center small rounded-5 text-bg-light p-2 me-3">
                                        <TokenIcon symbol="COMP" css={`${css['comp-icon']} me-2 d-none d-sm-block`} /> Rewards
                                    </div>
                                </button>
                            </h2>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </>
    )
}
  