import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Address } from 'viem';
import { AsyncData, AsyncStatus, IdleData } from '../../../utils/async';
import { PriceFeed, Token } from '../../../types';
import BigNumber from 'bignumber.js';
import { ThunkApiFields } from '../../types';
import { MarketDataService } from '../../../services/market-data-service';
import * as MarketSelector from '../../../selectors/market-selector';
import { PositionsService } from '../../../services/positions-service';
import { fromBigInt } from '../../../utils/bn';
import { getPriceFeedKind } from '../../../utils/markets';

export type CollateralPositionsByMarket = Record<Address, {
    token: Token
    balance: BigNumber
    priceFeed: PriceFeed
    collateralFactor: number
    liquidationThreshold: number
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
            const positionsService = new PositionsService({ comet, publicClient })
            const balances = await positionsService.collateralBalancesOf({ account, tokens })
            let positionsByMarket : CollateralPositionsByMarket = {}
            for (let index = 0; index < tokens.length; index++) {
                const { token, priceFeed: address, borrowCollateralFactor, liquidateCollateralFactor } = tokens[index]
                const balance = fromBigInt(balances[index], token.decimals)
                const priceFeed = { address, kind: getPriceFeedKind(market, chainId) } 
                const collateralFactor = Number(borrowCollateralFactor)
                const liquidationThreshold = Number(liquidateCollateralFactor)
                const positionData = { token, balance, priceFeed, collateralFactor, liquidationThreshold }
                positionsByMarket = { ...positionsByMarket,  [token.address]: positionData }
            }
            positions = { ...positions, [comet]: positionsByMarket }  
        }
        console.log(Date.now(), 'collateralPositions', chainId, positions)
        return positions
    }
)

export const { collateralPositionsReset } = collateralPositionsSlice.actions

export default collateralPositionsSlice.reducer
