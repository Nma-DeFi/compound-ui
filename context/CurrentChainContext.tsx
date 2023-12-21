import { createContext, useState } from "react";
import { mainnet, useAccount, useNetwork, useSwitchNetwork } from "wagmi";

type CurrentChainContextType = {
    currentChainId: number;
    setCurrentChainId: (chainId: number) => void;
}

export const CurrentChainContext = createContext<CurrentChainContextType | null>(null);

export const CurrentChainProvider = ({ children }) => {

    const { isConnected } = useAccount();
    const { chain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();

    const [ chainId, setChainId ] = useState<number>(isConnected ? chain.id : mainnet.id);

    const setCurrentChainId = (id: number) => {
        if (isConnected) { 
            switchNetwork(id);
        }
        setChainId(id);
    }

    return (
        <CurrentChainContext.Provider value={{ currentChainId: chainId, setCurrentChainId }}>
            { children }
        </CurrentChainContext.Provider>
    );
};