import { useQuery } from "@tanstack/react-query"
import { useCollateralPositions } from "./useCollateralPositions"
import { useBorrowPositions } from "./useBorrowPositions"
import { usePriceService } from "./usePriceService"
import { useCurrentAccount } from "./useCurrentAccount"
import { PublicClient } from "wagmi"
import { Market } from "../types"
import { getLiquidationRisk } from "../redux/helpers/liquidation-risk"

export function useLiquidationRisk({ chainId, publicClient, market } : 
  { 
    chainId: number; 
    publicClient: PublicClient,
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
    staleTime: Infinity,
  })
}