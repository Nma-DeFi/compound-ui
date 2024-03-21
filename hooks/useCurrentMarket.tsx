import { useAppSelector } from "../redux/hooks";

export function useCurrentMarket() {
    return useAppSelector(state => state.currentMarket.market)
}