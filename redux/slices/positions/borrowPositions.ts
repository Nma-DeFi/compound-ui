import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { Address } from 'viem';
import * as MarketSelector from '../../../selectors/market-selector';
import { MarketDataService } from '../../../services/market-data-service';
import { PositionsService } from '../../../services/positions-service';
import { Market, PriceFeed, Token } from '../../../types';
import { AsyncData, AsyncStatus, IdleData } from '../../../utils/async';
import { ThunkApiFields } from '../../types';
import * as MarketUtils from '../../../utils/markets';
import { log } from '../../helpers/borrow';
import { fromBigInt } from '../../../utils/bn';

export type BorrowBalance = {
  borrowBalance: BigNumber
  borrowApr: number
  baseToken: Token
  priceFeed: PriceFeed
  market: Market
}

export type BorrowPositionsData = Record<Address, BorrowBalance>

export type BorrowPositionsState = AsyncData<BorrowPositionsData>

const initialState : BorrowPositionsState = IdleData

export const borrowPositionsSlice = createSlice({
  name: 'borrowPositions',
  initialState,
  reducers: {
    borrowPositionsReset: (state: BorrowPositionsState) => {
      state.data = undefined
      Object.assign(state, AsyncStatus.Idle)
    },
    borrowPositionIncrease: (state: BorrowPositionsState, action: PayloadAction<{ comet: Address, amount: BigNumber }>) => {
      const { comet, amount } = action.payload
      const oldBalance = state.data[comet].borrowBalance
      state.data[comet].borrowBalance = oldBalance.plus(amount)
    },
    borrowPositionDecrease: (state: BorrowPositionsState, action: PayloadAction<{ comet: Address, amount: BigNumber }>) => {
      const { comet, amount } = action.payload
      const oldBalance = state.data[comet].borrowBalance
      const newBalance = oldBalance.minus(amount)
      state.data[comet].borrowBalance =  BigNumber.max(0, newBalance)
    },
    borrowPositionSet: (state: BorrowPositionsState, action: PayloadAction<{ comet: Address, amount: BigNumber }>) => {
      const { comet, amount } = action.payload
      state.data[comet].borrowBalance = amount
      Object.assign(state, AsyncStatus.Success)
    },
  },
  extraReducers(builder) {
      builder
        .addCase(borrowPositionsInit.pending, (state: BorrowPositionsState) => {
          state.data = undefined
          Object.assign(state, AsyncStatus.Loading)
        })
        .addCase(borrowPositionsInit.fulfilled, (state: BorrowPositionsState, action: PayloadAction<BorrowPositionsData>) => {
          state.data = action.payload
          Object.assign(state, AsyncStatus.Success)
        })
        .addCase(borrowPositionsInit.rejected, (state: BorrowPositionsState, action: PayloadAction<unknown>) => {
          console.error(action)
          state.data = undefined
          Object.assign(state, AsyncStatus.Error)
        })
        .addCase(borrowPositionsRefresh.fulfilled, (state: BorrowPositionsState, action: PayloadAction<BorrowPositionsData>) => {
          state.data = action.payload
          Object.assign(state, AsyncStatus.Success)
        })
        .addCase(borrowPositionsRefresh.rejected, (state: BorrowPositionsState, action: PayloadAction<unknown>) => {
          console.error(action)
          state.data = undefined
          Object.assign(state, AsyncStatus.Error)
        })
  }
})

const loadBorrowPositions = async (_, { getState }) => {
  const { chainId } = getState().currentChain
  const { address: account } = getState().currentAccount
  const { publicClient } = getState().publicClient

  const marketDataService = new MarketDataService({ chainId })
  const markets = await marketDataService.findAllMarkets()
  const comets = markets.map(m => m.cometProxy)

  const borrowBalances = await PositionsService.borrowBalancesOf({ publicClient, account, markets: comets })

  let positions: BorrowPositionsData = {}

  markets.forEach((market, index) => {
      const comet = MarketSelector.cometProxy(market)
      const baseToken = MarketSelector.baseToken(market)
      const borrowApr = MarketSelector.netBorrowAprScaled(market)
      const address = MarketSelector.baseTokePriceFeed(market)
      const kind = MarketUtils.getPriceFeedKind(market, chainId)
      const priceFeed = { address, kind } 
      const borrowBalance = fromBigInt(borrowBalances[index], baseToken.decimals)
      positions = { ...positions, [comet]: { borrowBalance, borrowApr, baseToken, priceFeed, market } }  
  })
  log(chainId, positions)
  return positions
}

export const borrowPositionsInit = createAsyncThunk<any, void, ThunkApiFields>(
  'borrowPositions/init',
  loadBorrowPositions
)

export const borrowPositionsRefresh = createAsyncThunk<any, void, ThunkApiFields>(
  'borrowPositions/refresh',
  loadBorrowPositions
)

export const { borrowPositionsReset, borrowPositionIncrease, borrowPositionDecrease, borrowPositionSet } = borrowPositionsSlice.actions

export default borrowPositionsSlice.reducer
