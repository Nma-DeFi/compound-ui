import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { Address } from 'viem';
import * as MarketSelector from '../../selectors/market-selector';
import { MarketDataService } from '../../services/market-data-service';
import { PositionsService } from '../../services/positions-service';
import { Token } from '../../types';
import { AsyncData, AsyncStatus, IdleData } from '../../utils/async';
import { bnf } from '../../utils/bn';
import { ThunkApiFields } from '../types';

export type SupplyPositionsData = Record<Address, {
  baseToken: Token,
  supplyBalance: BigNumber,
}>

export type SupplyPositionsState = AsyncData<SupplyPositionsData>

const initialState : SupplyPositionsState = IdleData

export const supplyPositionsSlice = createSlice({
  name: 'supplyPositions',
  initialState,
  reducers: {
    supplyPositionsReset: (state) => {
      state.data = undefined
      Object.assign(state, AsyncStatus.Idle)
    }
  },
  extraReducers(builder) {
      builder
        .addCase(supplyPositionsInit.pending, (state) => {
          state.data = undefined
          Object.assign(state, AsyncStatus.Loading)
        })
        .addCase(supplyPositionsInit.fulfilled, (state, action) => {
          state.data = action.payload
          Object.assign(state, AsyncStatus.Success)
        })
        .addCase(supplyPositionsInit.rejected, (state) => {
          state.data = undefined
          Object.assign(state, AsyncStatus.Error)
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
          const comet = MarketSelector.cometProxy(market)
          const baseToken = MarketSelector.baseToken(market)
          const positionsService = new PositionsService({comet, publicClient })
          const supplyBalance = await positionsService.supplyBalanceOf(address)
          positions = { ...positions, [comet]: { baseToken, supplyBalance } }  
      }
      const formatter = ({baseToken, supplyBalance}) => `${baseToken.name} : ${bnf(supplyBalance)}`
      console.log(Date.now(), 'supplyPositions/init', chainId, Object.values(positions).map(formatter))
      return positions
  }
)

export const { supplyPositionsReset } = supplyPositionsSlice.actions

export default supplyPositionsSlice.reducer