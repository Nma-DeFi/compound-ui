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
import { fromBigInt } from '../../../utils/bn';

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
        .addCase(supplyPositionsRefresh.fulfilled, (state: SupplyPositionsState, action: PayloadAction<SupplyPositionsData>) => {
          state.data = action.payload
          Object.assign(state, AsyncStatus.Success)
        })
        .addCase(supplyPositionsRefresh.rejected, (state: SupplyPositionsState, action: PayloadAction<unknown>) => {
          console.error(action)
          state.data = undefined
          Object.assign(state, AsyncStatus.Error)
        })
  }
})

const loadSupplyPositions = async (_, { getState }) => {
  const { chainId } = getState().currentChain
  const { address: account } = getState().currentAccount
  const { publicClient } = getState().publicClient

  const marketDataService = new MarketDataService({ chainId })
  const markets = await marketDataService.findAllMarkets()
  const comets = markets.map(m => m.cometProxy)

  const supplyBalances = await PositionsService.supplyBalancesOf({ publicClient, account, markets: comets })

  let positions: SupplyPositionsData = {}

  markets.forEach((market, index) => {
      const comet = MarketSelector.cometProxy(market)
      const baseToken = MarketSelector.baseToken(market)
      const address = MarketSelector.baseTokePriceFeed(market)
      const kind = MarketUtils.getPriceFeedKind(market, chainId)
      const priceFeed = { address, kind } 
      const supplyBalance = fromBigInt(supplyBalances[index], baseToken.decimals)
      positions = { ...positions, [comet]: { baseToken, supplyBalance, priceFeed } }  
  })
  log(chainId, positions)
  return positions
}

export const supplyPositionsInit = createAsyncThunk<any, void, ThunkApiFields>(
  'supplyPositions/init',
  loadSupplyPositions
)

export const supplyPositionsRefresh = createAsyncThunk<any, void, ThunkApiFields>(
  'supplyPositions/refresh',
  loadSupplyPositions
)

export const { supplyPositionsReset, supplyPositionIncrease, supplyPositionDecrease, supplyPositionSet  } = supplyPositionsSlice.actions

export default supplyPositionsSlice.reducer
