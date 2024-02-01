import { useEffect, useState } from "react"
import { PositionsService } from "../services/positions-service"

export function usePositionsService({ comet, publicClient }) : PositionsService {
    
    const [ positionsService, setPositionsService ] = useState<PositionsService>()

    useEffect(() => {
        if (publicClient &&  comet) {
            const service = new PositionsService({ publicClient, comet })
            setPositionsService(service)
        } else {
            setPositionsService(null)
        }
    }, [publicClient, comet])

    return positionsService
}