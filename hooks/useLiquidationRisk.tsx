import { useQuery } from "@tanstack/react-query"
import { useCollateralPositions } from "./useCollateralPositions"
import { useBorrowPositions } from "./useBorrowPositions"
import { usePriceService } from "./usePriceService"
import { useCurrentAccount } from "./useCurrentAccount"
import { PublicClient } from "wagmi"
import { Market, Token } from "../types"
import { getLiquidationRisk, getLiquidationRiskByCollateralWithdrawal } from "../redux/helpers/liquidation-risk"
import { PRICE_STALE_TIME } from "../services/price-service"
import BigNumber from "bignumber.js"

export function useLiquidationRisk({ chainId, publicClient, market } : 
  { 
    chainId: number
    publicClient: PublicClient
    market: Market
  }) {

  const { isConnected } = useCurrentAccount()

  const priceService = usePriceService({ chainId, publicClient})

  const { isSuccess: isCollateralPositions, data: collateralPositions } = useCollateralPositions()
  const { isSuccess: isBorrowPositions, data: borrowPositions } = useBorrowPositions()

  return useQuery({
    queryKey: ['LiquidationRisk', chainId, market, borrowPositions, collateralPositions],
    queryFn: () => getLiquidationRisk({ chainId, market, borrowPositions, collateralPositions, priceService }),
    enabled: !!(isConnected && market && isCollateralPositions && isBorrowPositions && priceService),
    staleTime: PRICE_STALE_TIME,
  })
}

export function useLiquidationRiskByCollateralWithdrawal({ chainId, publicClient, market, collateral, amount } : 
  { 
    chainId: number 
    publicClient: PublicClient
    market: Market
    collateral: Token
    amount: BigNumber
  }) {

  const { isConnected } = useCurrentAccount()

  const priceService = usePriceService({ chainId, publicClient})

  const { isSuccess: isCollateralPositions, data: collateralPositions } = useCollateralPositions()
  const { isSuccess: isBorrowPositions, data: borrowPositions } = useBorrowPositions()

  return useQuery({
    queryKey: ['LiquidationRiskByCollateralWithdrawal', chainId, market, borrowPositions, collateralPositions, collateral, amount],
    queryFn: () => getLiquidationRiskByCollateralWithdrawal({ chainId, market, borrowPositions, collateralPositions, priceService, collateral, amount }),
    enabled: !!(isConnected && market && isCollateralPositions && isBorrowPositions && priceService && collateral && amount),
    staleTime: PRICE_STALE_TIME,
  })
}