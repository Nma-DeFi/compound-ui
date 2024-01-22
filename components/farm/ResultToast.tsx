import { SmallSpinner } from "../Spinner";
import { useWaitForTransaction } from "wagmi";
import { bnf } from "../../utils/bn";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { marketDataInit } from "../../redux/slices/marketData";

export const RESULT_TOAST = 'result-toast'

export default function ResultToast({ token, amount, hash}) {

    const dispatch = useAppDispatch()
    const { isLoading, isSuccess, data } = useWaitForTransaction({ hash })

    useEffect(() => {
        dispatch(marketDataInit())
    }, [isSuccess])

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id={RESULT_TOAST} className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                <div className="toast-header">
                    <strong className="fs-5 me-auto">Deposit</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    <div className="fs-6 text-center">
                        {isLoading &&
                            <>Deposing { bnf(amount) } { token?.symbol }. Wait please <SmallSpinner /></>
                        }
                        {isSuccess &&
                            <>
                                Success !
                                <a href={ data.transactionHash } className="text-decoration-none ps-2" target="_blank" rel="noreferrer" >
                                    Transaction <i className="bi bi-box-arrow-up-right"></i>
                                </a>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}