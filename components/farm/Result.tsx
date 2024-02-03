import { SmallSpinner } from "../Spinner";
import { useWaitForTransaction } from "wagmi";
import { bnf } from "../../utils/bn";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { marketDataInit } from "../../redux/slices/marketData";
import { transactionUrl } from "../../utils/chains";
import { useCurrentChain } from "../../hooks/useCurrentChain";
import { Action } from "../../pages/farm";
import { supplyPositionsInit } from "../../redux/slices/supplyPositions";

export default function Result({ id, action, token, amount, hash}) {

    const { currentChainId: chainId } = useCurrentChain();
    const { isLoading, isSuccess, isError, data, error } = useWaitForTransaction({ hash  })

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isSuccess) {
            console.log('TransactionReceipt', data)
            dispatch(supplyPositionsInit())
            dispatch(marketDataInit())
        }
    }, [isSuccess])

    useEffect(() => { 
        if (isError) console.error(error) 
    }, [isError])
    
    const actionLabel = () => (action === Action.Deposit) ? "Deposit" : "Withdrawal"

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-4">
            <div id={id} className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                <div className="toast-body text-center px-0 py-4">
                        {isLoading && (
                            <>
                                <h4 className="mb-4">{actionLabel()} of <span className="text-body-secondary">{ bnf(amount) } { token?.symbol }</span></h4>
                                <div className="fs-5 text-body-secondary">Wait please <SmallSpinner /></div>
                            </>
                        )}
                        {isSuccess && (
                            <>
                                <h4 className="mb-3">Success !</h4>
                                <a href={ transactionUrl({ chainId, txHash: data.transactionHash }) } className="text-decoration-none" target="_blank" rel="noreferrer" >
                                    <h5 className="mb-4">Transaction <i className="bi bi-box-arrow-up-right"></i></h5>
                                </a>
                                <button type="button" className="btn btn-primary btn-sm text-white" data-bs-dismiss="toast">Close</button>
                            </>
                        )}
                        {isError && (
                            <>
                                <h3 className="text-danger mb-4">Error</h3>
                                <button type="button" className="btn btn-primary btn-sm text-white" data-bs-dismiss="toast">Close</button>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}