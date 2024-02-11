import { useAppSelector } from "../redux/hooks"

export function useSupplyPositions() {
    return useAppSelector(state => state.supplyPositions)
}