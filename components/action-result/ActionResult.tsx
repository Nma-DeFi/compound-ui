import { useEffect } from "react";
import { useWaitForTransaction } from "wagmi";
import { useCurrentChain } from "../../hooks/useCurrentChain";
import { useAppDispatch } from "../../redux/hooks";
import { supplyPositionDecrease, supplyPositionIncrease } from "../../redux/slices/positions/supplyPositions";
import { getTokenOrNativeCurrency, transactionUrl } from "../../utils/chains";
import { SmallSpinner } from "../Spinner";
import { ActionInfo, ActionType } from "../../types";
import { ActionLabels } from "./ActionsLabels";
import { collateralPositionDecrease, collateralPositionIncrease } from "../../redux/slices/positions/collateralPositions";
import Amount from "../Amount";
import { borrowPositionDecrease, borrowPositionIncrease } from "../../redux/slices/positions/borrowPositions";

export const ACTION_RESULT_TOAST = 'action-result-toast'

type ActionResultParam = ActionInfo & { 
    id?: string
    onSuccess?: () => void 
}

export default function ActionResult({ id, comet, action, token, amount, hash, onSuccess } : ActionResultParam) {

    const { currentChainId: chainId } = useCurrentChain()
    const { isLoading, isSuccess, isError, data, error } = useWaitForTransaction({ hash  })

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isSuccess) {
            switch (action) {
                case ActionType.DepositBaseToken:
                    dispatch(supplyPositionIncrease({ comet, amount }))
                    break
                case ActionType.WithdrawBaseToken:
                    dispatch(supplyPositionDecrease({ comet, amount }))
                    break
                case ActionType.DepositCollateral:
                    dispatch(collateralPositionIncrease({ comet, token, amount }))
                    break                    
                case ActionType.WithdrawCollateral:
                    dispatch(collateralPositionDecrease({ comet, token, amount }))
                    break
                case ActionType.Borrow:
                    dispatch(borrowPositionIncrease({ comet, amount }))
                    break
                case ActionType.Repay:
                    dispatch(borrowPositionDecrease({ comet, amount }))
                    break
            }
            onSuccess?.()
        }
    }, [isSuccess])

    useEffect(() => { 
        if (isError) console.error(error) 
    }, [isError])

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-4">
            <div id={id || ACTION_RESULT_TOAST} className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                {isLoading && (
                    <>
                        <div className="toast-header">
                            <div className="me-auto">{ActionLabels[action].header}</div>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className="toast-body text-center px-0 py-4">
                            <h5 className="mb-4">{ActionLabels[action].content} <span className="text-body-secondary"><Amount value={amount} /> { getTokenOrNativeCurrency(chainId, token)?.symbol }</span></h5>
                            <div className="fs-6 text-body-secondary">Wait please <SmallSpinner /></div>
                        </div>
                    </>
                )}
                {isSuccess && (
                    <div className="toast-body text-center px-0 py-4">
                        <h4 className="text-primary mb-3">Success !</h4>
                        <a href={ transactionUrl({ chainId, txHash: data.transactionHash }) } className="link-dark text-decoration-none" target="_blank" rel="noreferrer" >
                            <p className="fs-6 mb-4">Transaction <i className="bi bi-box-arrow-up-right"></i></p>
                        </a>
                        <button type="button" className="btn btn-primary btn-sm text-white" data-bs-dismiss="toast">Close</button>
                    </div>
                )}
                {isError && (
                    <div className="toast-body text-center px-0 py-4">
                        <h4 className="text-danger mb-3">Failure</h4>
                        <p className="fs-6 mb-4">See the browser console</p>
                        <button type="button" className="btn btn-primary btn-sm text-white" data-bs-dismiss="toast">Close</button>
                    </div>
                )}
            </div>
        </div>
    )
}


