import { ActionType } from "../../types";

export const ActionLabels = {
    [ActionType.DepositBaseToken] : {
        header : 'Deposit',
        content : 'Deposit',
    },
    [ActionType.DepositCollateral] : {
        header : 'Deposit collateral',
        content : 'Deposit',
    },
    [ActionType.WithdrawBaseToken] : {
        header : 'Withdraw',
        content : 'Withdrawal',
    },
    [ActionType.WithdrawCollateral] : {
        header : 'Withdraw collateral',
        content : 'Withdrawal',
    },
}