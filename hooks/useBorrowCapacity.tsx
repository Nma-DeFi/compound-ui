import { useQuery } from "@tanstack/react-query"
import { useCollateralPositions } from "./useCollateralPositions"
import { useBorrowPositions } from "./useBorrowPositions"
import { usePriceService } from "./usePriceService"
import { getBorrowCapacity } from "../redux/helpers/borrow"
import { useCurrentAccount } from "./useCurrentAccount"

export function useBorrowCapacity({ chainId, publicClient, marketId }) {

  const { isConnected } = useCurrentAccount()

  const priceService = usePriceService({ chainId, publicClient})

  const { isSuccess: isCollateralPositions, data: collateralPositions } = useCollateralPositions()
  const { isSuccess: isBorrowPositions, data: borrowPositions } = useBorrowPositions()

  return useQuery({
    queryKey: ['BorrowCapacity', chainId, marketId, borrowPositions, collateralPositions],
    queryFn: () => getBorrowCapacity({ marketId, borrowPositions, collateralPositions, priceService }),
    enabled: !!(isConnected && marketId && isCollateralPositions && isBorrowPositions && priceService),
    staleTime: (2 * 60 * 1000),
  })
}