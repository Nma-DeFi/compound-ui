import { useAppSelector } from "../redux/hooks"

export function useCollateralPositions() {
    return useAppSelector(state => state.collateralPositions)
}