import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MarketDataService } from '../../services/market-data-service';
import { ThunkApiFields } from '../types';

export const marketDataSlice = createSlice({
    name: 'marketData',
    initialState: {
        status: 'idle',
        markets: undefined,
    },
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(marketDataInit.pending, (state) => {
          state.status = 'loading'
          state.markets = undefined
        })
        .addCase(marketDataInit.fulfilled, (state, action) => {
          state.status = 'success'
          state.markets = action.payload
        })
        .addCase(marketDataInit.rejected, (state) => {
          state.status = 'error'
          state.markets = undefined
        })
    }
})
  
export const marketDataInit = createAsyncThunk<any, void, ThunkApiFields>(
    'marketData/init',
    async (_, { getState }) => {
        const { chainId } = getState().currentChain
        const { isConnected, address } = getState().currentAccount
        
        const service = new MarketDataService({ chainId })

        const markets = isConnected 
            ? service.findAllMarketsWithSupplyPositions(address)
            : service.findAllMarkets()

        return await markets
    }
)

export default marketDataSlice.reducer