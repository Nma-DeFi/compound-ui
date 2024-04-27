import { usePublicClient } from "wagmi"
import { useCurrentAccount } from "./useCurrentAccount"
import { useCurrentChain } from "./useCurrentChain"
import { usePriceService } from "./usePriceService"
import { useQuery } from "@tanstack/react-query"
import { getTotalCollateralUsdBalance } from "../redux/helpers/collateral"
import { PRICE_STALE_TIME } from "../services/price-service"

export function useTotalCollateralUsdByChain({ asyncCollateralPositions }) {

    const { isSuccess: isCollateralPositions, data: collateralPositions } = asyncCollateralPositions
    
    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const priceService = usePriceService({ chainId, publicClient})

    return useQuery({
        queryKey: ['TotalCollateralUsd', chainId, collateralPositions],
        queryFn: () => getTotalCollateralUsdBalance({ collateralPositions, priceService }),
        enabled: !!(isConnected && isCollateralPositions && priceService),
        staleTime: PRICE_STALE_TIME,
    })
}