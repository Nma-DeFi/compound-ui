import { Address } from "viem"

export type Asset = {
  name: string, 
  symbol: string, 
  decimals: number
}

export type Token = Asset & { address: Address }

export type NativeCurrency = Asset