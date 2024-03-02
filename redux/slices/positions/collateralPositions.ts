import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Address } from 'viem';
import { AsyncData, AsyncStatus, IdleData } from '../../../utils/async';
import { PriceFeed, Token } from '../../../types';
import BigNumber from 'bignumber.js';
import { ThunkApiFields } from '../../types';
import { MarketDataService } from '../../../services/market-data-service';
import * as MarketSelector from '../../../selectors/market-selector';
import { PositionsService } from '../../../services/positions-service';
import { PriceService } from '../../../services/price-service';
import { Zero, bnf } from '../../../utils/bn';

export type CollateralPositionsByMarket = Record<Address, {
    token: Token,
    balance: BigNumber,
    priceFeed: PriceFeed
}>

export type CollateralPositionsData = Record<Address, CollateralPositionsByMarket>
  
export type CollateralPositionsState = AsyncData<CollateralPositionsData>

const initialState : CollateralPositionsState = IdleData

export const collateralPositionsSlice = createSlice({
    name: 'collateralPositions',
    initialState,
    reducers: {
        collateralPositionsReset: (state: CollateralPositionsState) => {
            state.data = undefined
            Object.assign(state, AsyncStatus.Idle)
        }
    },
    extraReducers(builder) {
        builder
          .addCase(collateralPositionsInit.pending, (state: CollateralPositionsState) => {
            state.data = undefined
            Object.assign(state, AsyncStatus.Loading)
          })
          .addCase(collateralPositionsInit.fulfilled, (state: CollateralPositionsState, action: PayloadAction<CollateralPositionsData>) => {
            state.data = action.payload
            Object.assign(state, AsyncStatus.Success)
          })
          .addCase(collateralPositionsInit.rejected, (state: CollateralPositionsState, action: PayloadAction<unknown>) => {
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
            const collateralBalances = await positionsService.collateralBalancesOf({ account, chainId, market, tokens })
            positions = { ...positions, [comet]: collateralBalances }  
        }
        console.log(Date.now(), 'collateralPositions', chainId, positions)
        return positions
    }
)

export const { collateralPositionsReset } = collateralPositionsSlice.actions

export default collateralPositionsSlice.reducer

export async function getCollateralUsdBalanceByMarket(
        { collateralPositions, marketId, priceService } : 
        { 
            collateralPositions: CollateralPositionsData, 
            marketId: Address, 
            priceService: PriceService
        }) 
    : Promise<BigNumber> {
    const positions = Object.values(collateralPositions[marketId])
    // TODO Multicall
    const promises = positions.map(({ priceFeed }) => priceService.getPriceFromFeed(priceFeed))
    const prices = await Promise.all(promises)
    let totalCollateralUsd: BigNumber = Zero
    for (let index = 0; index < prices.length; index++) {
        const price = prices[index]
        const balance = positions[index].balance
        totalCollateralUsd = totalCollateralUsd.plus(balance.times(price))
    }   
    return totalCollateralUsd
}

export async function getTotalCollateralUsdBalance(
    { collateralPositions, priceService } : 
    { 
        collateralPositions: CollateralPositionsData, 
        priceService: PriceService
    }) 
: Promise<BigNumber> {
    const collateralsByMarketsParams = Object.keys(collateralPositions).map((marketId: Address) => ({ collateralPositions, marketId, priceService }))
    const collateralsByMarketsPromises = collateralsByMarketsParams.map(params => getCollateralUsdBalanceByMarket(params))
    const collateralsByMarketsArray = await Promise.all(collateralsByMarketsPromises)
    return collateralsByMarketsArray.reduce((accumulator, currentValue) => accumulator.plus(currentValue), Zero)
}