import { mainnet, useNetwork, useSwitchNetwork } from "wagmi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { chainSwitched } from "../redux/slices/currentChain";
import { useCurrentAccount } from "./useCurrentAccount";

export function useCurrentChain() {

    const { isConnected } = useCurrentAccount();
    const { chain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();
    const dispatch = useAppDispatch();

    let currentChainId = useAppSelector(state => state.currentChain.chainId);
    if (currentChainId === 0) {
        currentChainId = isConnected ? chain.id : mainnet.id
        dispatch(chainSwitched(currentChainId));
    }

    const setCurrentChainId = (id: number) => {
        if (isConnected) { 
            switchNetwork(id);
        }
        dispatch(chainSwitched(id));
    }
    
    return { currentChainId, setCurrentChainId };
}