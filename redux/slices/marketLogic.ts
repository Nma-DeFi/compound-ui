import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MarketDataService } from '../../services/market-data-service';

interface MarketLogicState {
    findAllMarkets: () => Promise<any[]>
    findAllMarketsWithSupplyPositions: (account: any) => Promise<any[]>
}

const initialState: MarketLogicState = {
    findAllMarkets: undefined,
    findAllMarketsWithSupplyPositions: undefined,
}

export const marketLogicSlice = createSlice({
    name: 'marketLogic',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<number>) => {
            const service = new MarketDataService({ chainId: action.payload })
            state.findAllMarkets = service.findAllMarkets
            state.findAllMarketsWithSupplyPositions = service.findAllMarketsWithSupplyPositions
        },
    },
})

export const marketLogicInit = () => {
    return (dispatch, getState) => {
        const { chainId } = getState().currentChain
        dispatch(init(chainId))
    }
}

export const { init } = marketLogicSlice.actions

export default marketLogicSlice.reducer