import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createPublicClient, http } from 'viem';
import { chainFromId, fixGoerliRpc, isUnsupportedChain } from '../../utils/chains';
import { marketDataInit } from './marketData';
import { marketLogicInit } from './marketLogic';
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
    console.log('chainSwitched', newChainId)
    if (isUnsupportedChain(newChainId)) {
        throw Error(`Unsupported Chain : ${newChainId}`)
    }
    return (dispatch, getState) => {
        const { chainId } = getState().currentChain
        if (newChainId !== chainId) {
            const client = createPublicClient({
                chain: chainFromId(newChainId),
                transport: http(fixGoerliRpc(newChainId)),
            })
            dispatch(chainIdUpdated(newChainId))
            dispatch(publicClientUpdated(client))
            dispatch(marketLogicInit())
            dispatch(marketDataInit())
        }
    }
}

export const { chainIdUpdated } = currentChainSlice.actions

export default currentChainSlice.reducer