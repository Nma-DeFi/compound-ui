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
import { bnf } from '../../../utils/bn';

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
      console.log('borrowPositionDecrease', 
        'old balance', oldBalance.toFixed(), 
        'amount', amount.toFixed(), 
        'new balance', newBalance.toFixed(),
        'result', state.data[comet].borrowBalance.toFixed())
    }
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
  }
})

export const borrowPositionsInit = createAsyncThunk<any, void, ThunkApiFields>(
  'borrowPositions/init',
  async (_, { getState }) => {
      const { chainId } = getState().currentChain
      const { address } = getState().currentAccount
      const { publicClient } = getState().publicClient

      const marketDataService = new MarketDataService({ chainId })
      const markets = await marketDataService.findAllMarkets()
  
      let positions: BorrowPositionsData = {}
  
      for (const market of markets) {
          const comet = MarketSelector.cometProxy(market)
          const baseToken = MarketSelector.baseToken(market)
          const borrowApr = MarketSelector.netBorrowAprScaled(market)
          const priceFeed = {
            address: MarketSelector.baseTokePriceFeed(market),
            kind: MarketUtils.getPriceFeedKind(market, chainId)
          } 
          const positionsService = new PositionsService({comet, publicClient })
          const borrowBalance = await positionsService.borrowBalanceOf(address)
          positions = { ...positions, [comet]: { borrowBalance, borrowApr, baseToken, priceFeed, market } }  
      }
      log(chainId, positions)
      return positions
    }
)

export const { borrowPositionsReset, borrowPositionIncrease, borrowPositionDecrease } = borrowPositionsSlice.actions

export default borrowPositionsSlice.reducer
