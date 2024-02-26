import { Address } from "viem"

export type Asset = {
  name: string, 
  symbol: string, 
  decimals: number
}

export type NativeCurrency = Asset

export type Token = Asset & { address: Address }

export enum WithdrawType { 
  BaseToken, 
  Collateral 
}

export type WithdrawParam = {
  comet: Address,
  token: Token,
  withdrawType: WithdrawType
}