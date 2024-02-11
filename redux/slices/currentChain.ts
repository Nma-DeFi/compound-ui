import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createPublicClient, http } from 'viem';
import { chainFromId, fixGoerliRpc, isUnsupportedChain } from '../../utils/chains';
import { publicClientUpdated } from './publicClient';

interface CurrentChainState {
    chainId: number
}

const initialState: CurrentChainState = {
    chainId: undefined,
}

export const currentChainSlice = createSlice({
    name: 'currentChain',
    initialState,
    reducers: {
        chainIdUpdated: (state, action: PayloadAction<number>) => {
            state.chainId = action.payload
        },
    },
})

export const chainSwitched = newChainId => {
    if (isUnsupportedChain(newChainId)) {
        throw Error(`Unsupported Chain : ${newChainId}`)
    }
    return (dispatch, getState) => {
        const { chainId } = getState().currentChain
        if (newChainId !== chainId) {
            const client = createCustomPublicClient(newChainId)
            dispatch(chainIdUpdated(newChainId))
            dispatch(publicClientUpdated(client))
        }
    }
}

export function createCustomPublicClient(chainId: number) {
    return createPublicClient({
        chain: chainFromId(chainId),
        transport: http(fixGoerliRpc(chainId)),
    })
}

export const { chainIdUpdated } = currentChainSlice.actions

export default currentChainSlice.reducer