import { usePublicClient } from "wagmi"
import { useCurrentAccount } from "./useCurrentAccount"
import { useCurrentChain } from "./useCurrentChain"
import { usePriceService } from "./usePriceService"
import { useQuery } from "@tanstack/react-query"
import { PRICE_STALE_TIME } from "../services/price-service"
import { getTotalEarningsUsdBalance } from "../redux/helpers/supply"

export function useTotalEarningsUsdByChain({ asyncSupplyPositions }) {
    const { isSuccess: isSupplyPositions, data: supplyPositions } = asyncSupplyPositions
    
    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const priceService = usePriceService({ chainId, publicClient})

    return useQuery({
        queryKey: ['TotalEarningsUsd', chainId, supplyPositions],
        queryFn: () => getTotalEarningsUsdBalance({ supplyPositions, priceService }),
        enabled: Boolean(isConnected && isSupplyPositions && priceService),
        staleTime: PRICE_STALE_TIME,
    })
}