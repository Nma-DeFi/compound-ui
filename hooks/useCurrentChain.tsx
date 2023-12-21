import { useContext } from "react"
import { CurrentChainContext } from "../context/CurrentChainContext"

export function useCurrentChain() {
    return useContext(CurrentChainContext);
}