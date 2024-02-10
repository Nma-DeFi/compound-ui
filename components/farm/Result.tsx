import { useEffect } from "react";
import { useWaitForTransaction } from "wagmi";
import { useCurrentChain } from "../../hooks/useCurrentChain";
import { Action } from "../../pages/farm";
import { useAppDispatch } from "../../redux/hooks";
import { supplyPositionsInit } from "../../redux/slices/supplyPositions";
import { transactionUrl } from "../../utils/chains";
import Amount from "../Amount";
import { SmallSpinner } from "../Spinner";

export default function Result({ id, action, token, amount, hash}) {

    const { currentChainId: chainId } = useCurrentChain();
    const { isLoading, isSuccess, isError, data, error } = useWaitForTransaction({ hash  })

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isSuccess) {
            dispatch(supplyPositionsInit())
        }
    }, [isSuccess])

    useEffect(() => { 
        if (isError) console.error(error) 
    }, [isError])
    
    const actionLabel = () => (action === Action.Deposit) ? "Deposit" : "Withdrawal"

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-4">
            <div id={id} className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                        {isLoading && (
                            <>
                               <div className="toast-header">
                                    <div className="me-auto">{actionLabel()}</div>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div className="toast-body text-center px-0 py-4">
                                    <h5 className="mb-4">{actionLabel()} of <span className="text-body-secondary"><Amount value={amount} /> { token?.symbol }</span></h5>
                                    <div className="fs-6 text-body-secondary">Wait please <SmallSpinner /></div>
                                </div>
                            </>
                        )}
                        {isSuccess && (
                            <div className="toast-body text-center px-0 py-4">
                                <h4 className="mb-3">Success !</h4>
                                <a href={ transactionUrl({ chainId, txHash: data.transactionHash }) } className="text-decoration-none" target="_blank" rel="noreferrer" >
                                    <h5 className="mb-4">Transaction <i className="bi bi-box-arrow-up-right"></i></h5>
                                </a>
                                <button type="button" className="btn btn-primary btn-sm text-white" data-bs-dismiss="toast">Close</button>
                            </div>
                        )}
                        {isError && (
                           <div className="toast-body text-center px-0 py-4">
                                <h4 className="text-danger mb-4">Error</h4>
                                <button type="button" className="btn btn-primary btn-sm text-white" data-bs-dismiss="toast">Close</button>
                            </div>
                        )}
            </div>
        </div>
    )
}