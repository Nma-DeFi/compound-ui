import { useAppSelector } from "../redux/hooks"

export function useBorrowPositions() {
    return useAppSelector(state => state.borrowPositions)
}