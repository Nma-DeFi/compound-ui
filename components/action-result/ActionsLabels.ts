import { ActionType } from "../../types";

export const ActionLabels = {
    [ActionType.DepositBaseToken] : {
        header : 'Deposit',
        content : 'Deposit of',
    },
    [ActionType.DepositCollateral] : {
        header : 'Deposit collateral',
        content : 'Deposit of',
    },
    [ActionType.WithdrawBaseToken] : {
        header : 'Withdrawal',
        content : 'Withdrawal of',
    },
    [ActionType.WithdrawCollateral] : {
        header : 'Withdraw collateral',
        content : 'Withdrawal of',
    },
    [ActionType.Borrow] : {
        header : 'Borrow',
        content : 'Borrowing',
    },
    [ActionType.Repay] : {
        header : 'Repay',
        content : 'Repaying',
    },
}