import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { marketLogicInit } from './marketLogic';
import { marketDataInit } from './marketData';

interface CurrentChainState {
    chainId: number | undefined
}

const initialState: CurrentChainState = {
    chainId: undefined,
}

export const currentChainSlice = createSlice({
    name: 'currentChain',
    initialState,
    reducers: {
        setChainId: (state, action: PayloadAction<number>) => {
            state.chainId = action.payload
        },
    },
})

export const chainSwitched = chainId => {
    return (dispatch) => {
        dispatch(setChainId(chainId))
        dispatch(marketLogicInit())
        dispatch(marketDataInit())
    }
}
  
export const { setChainId } = currentChainSlice.actions

export default currentChainSlice.reducer