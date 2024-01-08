import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { accountConnected, accountDisconnected } from "../redux/slices/currentAccount";

export function useAccountInit() {
    const dispatch = useAppDispatch()

    const onConnect = (data) => dispatch(accountConnected(data.address))
    const onDisconnect = () => dispatch(accountDisconnected())

    useAccount({ onConnect, onDisconnect })
}

export function useCurrentAccount() {
    return useAppSelector(state => state.currentAccount);
}