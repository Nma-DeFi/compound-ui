import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Address } from 'viem';
import { AsyncData, AsyncStatus, IdleData } from '../../../utils/async';
import { Token } from '../../../types';
import BigNumber from 'bignumber.js';
import { ThunkApiFields } from '../../types';
import { MarketDataService } from '../../../services/market-data-service';
import * as MarketSelector from '../../../selectors/market-selector';
import { PositionsService } from '../../../services/positions-service';

export type CollateralBalances = Record<Address, {
    token: Token,
    balance: BigNumber,
    priceFeed: Address
}>

export type CollateralPositionsData = Record<Address, CollateralBalances>
  
export type CollateralPositionsState = AsyncData<CollateralPositionsData>

const initialState : CollateralPositionsState = IdleData

export const collateralPositionsSlice = createSlice({
    name: 'collateralPositions',
    initialState,
    reducers: {
        collateralPositionsReset: (state) => {
            state.data = undefined
            Object.assign(state, AsyncStatus.Idle)
        }
    },
    extraReducers(builder) {
        builder
          .addCase(collateralPositionsInit.pending, (state) => {
            state.data = undefined
            Object.assign(state, AsyncStatus.Loading)
          })
          .addCase(collateralPositionsInit.fulfilled, (state, action) => {
            state.data = action.payload
            Object.assign(state, AsyncStatus.Success)
          })
          .addCase(collateralPositionsInit.rejected, (state, action) => {
            console.error(action)
            state.data = undefined
            Object.assign(state, AsyncStatus.Error)
          })
    }
})

export const collateralPositionsInit = createAsyncThunk<any, void, ThunkApiFields>(
    'collateralPositions/init',
    async (_, { getState }) => {
        const { chainId } = getState().currentChain
        const { address: account } = getState().currentAccount
        const { publicClient } = getState().publicClient

        const marketDataService = new MarketDataService({ chainId })
        const markets = await marketDataService.findAllMarkets()
    
        let positions: CollateralPositionsData = {}

        for (const market of markets) {
            const comet = MarketSelector.cometProxy(market)
            const tokens = MarketSelector.collateralTokens(market)
            const positionsService = new PositionsService({comet, publicClient })
            const collateralBalances = await positionsService.collateralBalancesOf({ account, tokens })
            positions = { ...positions, [comet]: collateralBalances }  
        }
        console.log(Date.now(), 'collateralPositions', chainId, positions)
        return positions
    }
)

export const { collateralPositionsReset } = collateralPositionsSlice.actions

export default collateralPositionsSlice.reducer

  