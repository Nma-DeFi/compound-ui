import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { Address } from 'viem';
import { cometProxy } from '../../selectors/market-selector';
import { MarketDataService } from '../../services/market-data-service';
import { PositionsService } from '../../services/positions-service';
import { AsyncStatus, ThunkApiFields } from '../types';
import { bnf } from '../../utils/bn';

type SupplyPositionsData = Record<Address, BigNumber>

type SupplyPositionsState = {
    status: AsyncStatus,
    positions: SupplyPositionsData 
}

const initialState : SupplyPositionsState = {
    status: 'idle',
    positions: undefined,
}

export const supplyPositionsSlice = createSlice({
    name: 'supplyPositions',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
          .addCase(supplyPositionsInit.pending, (state) => {
            state.status = 'loading'
            state.positions = undefined
          })
          .addCase(supplyPositionsInit.fulfilled, (state, action) => {
            state.status = 'success'
            state.positions = action.payload
          })
          .addCase(supplyPositionsInit.rejected, (state) => {
            state.status = 'error'
            state.positions = undefined
          })
      }
})

export const supplyPositionsInit = createAsyncThunk<any, void, ThunkApiFields>(
    'supplyPositions/init',
    async (_, { getState }) => {
        const { address } = getState().currentAccount
        const { chainId } = getState().currentChain
        const { publicClient } = getState().publicClient

        const marketDataService = new MarketDataService({ chainId })
        const markets = await marketDataService.findAllMarkets()

        let positions: SupplyPositionsData = {}

        for (const market of markets) {
            const comet = cometProxy(market)
            const positionsService = new PositionsService({comet, publicClient })
            const balance = await positionsService.supplyBalanceOf(address)
            positions = { ...positions, [comet]: balance }  
            console.log('supplyPositions/init', comet, bnf(balance))
        }
        return positions
    }
)

export default supplyPositionsSlice.reducer