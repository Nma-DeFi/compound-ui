import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Market } from '../../types';

interface CurrentMarketState {
    market: Market
}

const initialState: CurrentMarketState = {
    market: undefined,
}

export const currentMarketSlice = createSlice({
    name: 'currentMarket',
    initialState,
    reducers: {
        marketChanged: (state, action: PayloadAction<Market>) => {
            state.market = action.payload
        },
        marketReset: (state) => {
            state.market = undefined
        },
    },
})


export const { marketChanged, marketReset } = currentMarketSlice.actions

export default currentMarketSlice.reducer