import BigNumber from "bignumber.js"
import { AbiItem, Address, Hash } from "viem"

export type Asset = {
  name: string, 
  symbol: string, 
  decimals: number
}

export type NativeCurrency = Asset

export type Token = Asset & { address: Address }

export type Contract = {
  address: Address,
  abi: AbiItem[]
}

export enum ActionType {
  DepositBaseToken,
  WithdrawBaseToken,
  DepositCollateral,
  WithdrawCollateral,
}

export type ActionInfo = {
  action: ActionType
  token: Asset
  amount: BigNumber
  hash: Hash
}

export type WithdrawType = ActionType.WithdrawBaseToken | ActionType.WithdrawCollateral
export type DepositType = ActionType.DepositBaseToken | ActionType.DepositCollateral

export type WithdrawParam = {
  comet: Address,
  token: Token,
  withdrawType: WithdrawType
}

export type DepositParam = {
  comet: Address,
  token?: Token,
  depositType: DepositType
}