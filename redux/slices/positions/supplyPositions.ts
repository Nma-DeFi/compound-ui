import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { Address } from 'viem';
import * as MarketSelector from '../../../selectors/market-selector';
import { MarketDataService } from '../../../services/market-data-service';
import { PositionsService } from '../../../services/positions-service';
import { PriceFeed, Token } from '../../../types';
import { AsyncData, AsyncStatus, IdleData } from '../../../utils/async';
import { ThunkApiFields } from '../../types';
import * as MarketUtils from '../../../utils/markets';
import { log } from '../../helpers/supply';
import { borrowPositionsReset } from './borrowPositions';

export type SupplyBalance = {
  baseToken: Token
  supplyBalance: BigNumber
  priceFeed: PriceFeed
}

export type SupplyPositionsData = Record<Address, SupplyBalance>

export type SupplyPositionsState = AsyncData<SupplyPositionsData>

const initialState : SupplyPositionsState = IdleData

export const supplyPositionsSlice = createSlice({
  name: 'supplyPositions',
  initialState,
  reducers: {
    supplyPositionsReset: (state: SupplyPositionsState) => {
      state.data = undefined
      Object.assign(state, AsyncStatus.Idle)
    },
    supplyPositionIncrease: (state: SupplyPositionsState, action: PayloadAction<{ comet: Address, amount: BigNumber }>) => {
      const { comet, amount } = action.payload
      const oldBalance = state.data[comet].supplyBalance
      state.data[comet].supplyBalance = oldBalance.plus(amount)
    },
    supplyPositionDecrease: (state: SupplyPositionsState, action: PayloadAction<{ comet: Address, amount: BigNumber }>) => {
      const { comet, amount } = action.payload
      const oldBalance = state.data[comet].supplyBalance
      const newBalance = oldBalance.minus(amount)
      state.data[comet].supplyBalance = BigNumber.max(0, newBalance)
      console.log('supplyPositionDecrease', 
        'old balance', oldBalance.toFixed(), 
        'amount', amount.toFixed(), 
        'new balance', newBalance.toFixed(),
        'result', state.data[comet].supplyBalance.toFixed())    
    },
    supplyPositionSet: (state: SupplyPositionsState, action: PayloadAction<{ comet: Address, amount: BigNumber }>) => {
      const { comet, amount } = action.payload
      state.data[comet].supplyBalance = amount
      Object.assign(state, AsyncStatus.Success)
    },
  },
  extraReducers(builder) {
      builder
        .addCase(supplyPositionsInit.pending, (state: SupplyPositionsState) => {
          state.data = undefined
          Object.assign(state, AsyncStatus.Loading)
        })
        .addCase(supplyPositionsInit.fulfilled, (state: SupplyPositionsState, action: PayloadAction<SupplyPositionsData>) => {
          state.data = action.payload
          Object.assign(state, AsyncStatus.Success)
        })
        .addCase(supplyPositionsInit.rejected, (state: SupplyPositionsState, action: PayloadAction<unknown>) => {
          console.error(action)
          state.data = undefined
          Object.assign(state, AsyncStatus.Error)
        })
  }
})

export const supplyPositionsInit = createAsyncThunk<any, void, ThunkApiFields>(
  'supplyPositions/init',
  async (_, { getState }) => {
      const { chainId } = getState().currentChain
      const { address } = getState().currentAccount
      const { publicClient } = getState().publicClient

      const marketDataService = new MarketDataService({ chainId })
      const markets = await marketDataService.findAllMarkets()
  
      let positions: SupplyPositionsData = {}
  
      for (const market of markets) {
          const comet = MarketSelector.cometProxy(market)
          const baseToken = MarketSelector.baseToken(market)
          const priceFeed = {
            address: MarketSelector.baseTokePriceFeed(market),
            kind: MarketUtils.getPriceFeedKind(market, chainId)
          } 
          const positionsService = new PositionsService({comet, publicClient })
          const supplyBalance = await positionsService.supplyBalanceOf(address)
          positions = { ...positions, [comet]: { baseToken, supplyBalance, priceFeed } }  
      }
      log(chainId, positions)
      return positions
    }
)

export const accruedPositionsReset = () => (dispatch) => {
  dispatch(supplyPositionsReset()) 
  dispatch(borrowPositionsReset())
}

export const { supplyPositionsReset, supplyPositionIncrease, supplyPositionDecrease, supplyPositionSet  } = supplyPositionsSlice.actions

export default supplyPositionsSlice.reducer
