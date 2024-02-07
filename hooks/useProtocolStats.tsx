import { useQuery } from "@tanstack/react-query";
import { ProtocolDataService } from "../services/protocol-data-service";

export function useProtocolStats({ chainId }) {
    
    const protocolDataService = new ProtocolDataService({ chainId })

    return useQuery({
        queryKey: ['Protocol', chainId],
        queryFn: () => protocolDataService.fetchProtocol(),
        staleTime: (3 * 60 * 1000),
    })
}