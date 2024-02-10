import { useAppSelector } from "../redux/hooks"

export function useCurrentAccount() {
    return useAppSelector(state => state.currentAccount)
}