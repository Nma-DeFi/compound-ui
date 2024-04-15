import BigNumber from "bignumber.js"
import { Address, Hash } from "viem"
import { AllMarketsQuery } from "./graphql/generated/sdk"

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type

export type Market = Flatten<AllMarketsQuery['markets']>

export type Asset = {
  name: string, 
  symbol: string, 
  decimals: number,
  address?: Address,
}

export type NativeCurrency = Asset

export type Token = Asset & { 
  priceFeed?: PriceFeed,
}

export enum ActionType {
  DepositBaseToken,
  DepositCollateral,
  WithdrawBaseToken,
  WithdrawCollateral,
  Borrow, Repay
}

export type ActionInfo = {
  action: ActionType
  token: Asset
  amount: BigNumber
  hash: Hash, 
  comet?: Address
}

export type WithdrawType = ActionType.WithdrawBaseToken | ActionType.WithdrawCollateral
export type DepositType = ActionType.DepositBaseToken | ActionType.DepositCollateral

export type WithdrawParam = {
  comet: Address,
  token: Token,
  withdrawType: WithdrawType,
  onWithdraw: (info) => void,
}

export type DepositParam = {
  comet: Address,
  token: Token,
  depositType: DepositType,
  onDeposit: (info) => void,
}

export enum PriceFeedKind {
  USD_PRICE,
  ETH_PRICE,
} 

export type PriceFeed = { 
  address: Address, 
  kind: PriceFeedKind
}