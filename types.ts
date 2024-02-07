import { Address } from "viem"

export type Token = {
  name: string, 
  symbol: string, 
  address: Address, 
  decimals: number
}

export type NativeCurrency = { 
  name: string, 
  symbol: string, 
  decimals: number 
}