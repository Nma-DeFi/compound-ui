import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createPublicClient, http } from 'viem';
import { chainFromId } from '../../utils/chains';
import { marketDataInit } from './marketData';
import { marketLogicInit } from './marketLogic';
import { supplyPositionsInit } from './supplyPositions';
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

export const chainSwitched = chainId => {
    console.log('chainSwitched', chainId)
    return (dispatch, getState) => {
        const { isConnected } = getState().currentAccount
        const client = createPublicClient({
            chain: chainFromId(chainId),
            transport: http(),
        })
        dispatch(chainIdUpdated(chainId))
        dispatch(publicClientUpdated(client))
        dispatch(marketLogicInit())
        dispatch(marketDataInit())
        if (isConnected) {
            dispatch(supplyPositionsInit())
        }
    }
}
  
export const { chainIdUpdated } = currentChainSlice.actions

export default currentChainSlice.reducer