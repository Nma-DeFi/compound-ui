import { usePublicClient } from "wagmi"
import { useCurrentAccount } from "./useCurrentAccount"
import { useCurrentChain } from "./useCurrentChain"
import { usePriceService } from "./usePriceService"
import { useQuery } from "@tanstack/react-query"
import { getCollateralUsdBalanceByMarket } from "../redux/helpers/collateral"

export function useMarketCollateralUsd({ asyncCollateralPositions, currentMarket }) {

    const { isSuccess: isCollateralPositions, data: collateralPositions } = asyncCollateralPositions
    
    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const marketId = currentMarket?.cometProxy

    const priceService = usePriceService({ chainId, publicClient})

    return useQuery({
        queryKey: ['TotalUsdCollateralForMarket', chainId, marketId, collateralPositions],
        queryFn: () => getCollateralUsdBalanceByMarket({ marketId, collateralPositions, priceService }),
        enabled: !!(isConnected && isCollateralPositions && marketId && priceService),
        staleTime: (2 * 60 * 1000),
    })
}