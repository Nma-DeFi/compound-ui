import { usePublicClient } from "wagmi"
import { useCurrentAccount } from "./useCurrentAccount"
import { useCurrentChain } from "./useCurrentChain"
import { usePriceService } from "./usePriceService"
import { useQuery } from "@tanstack/react-query"
import { PRICE_STALE_TIME } from "../services/price-service"
import { getTotalBorrowingsUsdBalance } from "../redux/helpers/borrow"

export function useTotalBorrowingsUsdByChain({ asyncBorrowPositions }) {
    const { isSuccess: isBorrowPositions, data: borrowPositions } = asyncBorrowPositions
    
    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const priceService = usePriceService({ chainId, publicClient})

    return useQuery({
        queryKey: ['TotalBorrowingsUsd', chainId, borrowPositions],
        queryFn: () => getTotalBorrowingsUsdBalance({ borrowPositions, priceService }),
        enabled: Boolean(isConnected && isBorrowPositions && priceService),
        staleTime: PRICE_STALE_TIME,
    })
}