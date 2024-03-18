import { usePublicClient } from "wagmi"
import { useCurrentAccount } from "./useCurrentAccount"
import { useCurrentChain } from "./useCurrentChain"
import { cometProxy } from "../selectors/market-selector"
import { usePriceService } from "./usePriceService"
import { useQuery } from "@tanstack/react-query"
import { getCollateralUsdBalanceByMarket } from "../redux/helpers/collateral"

export function useTotalUsdCollateral({ asyncCollateralPositions, asyncMarkets, marketIndex }) {

    const { isSuccess: isCollateralPositions, data: collateralPositions } = asyncCollateralPositions
    const { isSuccess: isMarkets, data: markets } = asyncMarkets
    
    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const marketId = isMarkets ? cometProxy(markets[marketIndex]) : undefined

    const priceService = usePriceService({ chainId, publicClient})

    return useQuery({
        queryKey: ['TotalUsdCollateralForMarket', chainId, marketId, collateralPositions],
        queryFn: () => getCollateralUsdBalanceByMarket({ marketId, collateralPositions, priceService }),
        enabled: !!(isConnected && isCollateralPositions && isMarkets && marketId && priceService),
        staleTime: (2 * 60 * 1000),
    })
}