import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MarketDataService } from '../../services/market-data-service';
import { AsyncStatus, AsyncStatusType, ThunkApiFields } from '../types';

type MarketDataState = { markets: any } & AsyncStatusType

const initialState : MarketDataState = {
  markets: undefined,
  ...AsyncStatus.Idle,
}

export const marketDataSlice = createSlice({
    name: 'marketData',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(marketDataInit.pending, (state) => {
          state.markets = undefined
          Object.assign(state, AsyncStatus.Loading)
        })
        .addCase(marketDataInit.fulfilled, (state, action) => {
          state.markets = action.payload
          Object.assign(state, AsyncStatus.Success)
        })
        .addCase(marketDataInit.rejected, (state) => {
          state.markets = undefined
          Object.assign(state, AsyncStatus.Error)
        })
    }
})
  
export const marketDataInit = createAsyncThunk<any, void, ThunkApiFields>(
    'marketData/init',
    (_, { getState }) => {
        const { chainId } = getState().currentChain
        const service = new MarketDataService({ chainId })
        return service.findAllMarkets()
    }
)

export default marketDataSlice.reducer