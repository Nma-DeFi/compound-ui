import { createSlice } from '@reduxjs/toolkit'
import { MarketInfoService } from '../../services/market-info-service';

export const marketDataSlice = createSlice({
    name: 'marketData',
    initialState: {
        markets: undefined
    },
    reducers: {
        marketDataLoaded: (state, action) => {
            state.markets = action.payload
        },
    },
})
  
export const marketDataInit = () => {
    
    return (dispatch, getState) => {
        const { chainId } = getState().currentChain
        const { isConnected, address } = getState().currentAccount

        console.log('marketDataInit', chainId, isConnected, address)

        const service = new MarketInfoService({ chainId })

        const fetchMarkets = isConnected 
            ? service.findAllMarketsWithSupplyPositions(address)
            : service.findAllMarkets()

        fetchMarkets.then(markets => dispatch(marketDataLoaded(markets)))
    }
}

export const { marketDataLoaded } = marketDataSlice.actions

export default marketDataSlice.reducer