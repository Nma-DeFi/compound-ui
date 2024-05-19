import { Address } from "viem"
import { AsyncData, AsyncStatus, IdleData } from "../../utils/async"
import { Token } from "../../types"
import BigNumber from "bignumber.js"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ThunkApiFields } from "../types"
import { RewardsService } from "../../services/rewards-service"

export type RewardsOwedByChain = Record<Address, {
    token: Token
    balance: BigNumber
}>

export type RewardsOwedData = Record<number, RewardsOwedByChain>
  
export type RewardsOwedState = AsyncData<RewardsOwedData>

const initialState : RewardsOwedState = IdleData

export const rewardsOwedSlice = createSlice({
    name: 'rewardsOwed',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(rewardsOwedInit.pending, (state: RewardsOwedState) => {
                state.data = undefined
                Object.assign(state, AsyncStatus.Loading)
            })
            .addCase(rewardsOwedInit.fulfilled, 
                (state: RewardsOwedState, action: PayloadAction<RewardsOwedData>) => {
                state.data = action.payload
                Object.assign(state, AsyncStatus.Success)
            })
            .addCase(rewardsOwedInit.rejected, 
                (state: RewardsOwedState, action: PayloadAction<unknown>) => {
                console.error(action)
                state.data = undefined
                Object.assign(state, AsyncStatus.Error)
            })
    }
})

export const rewardsOwedInit = createAsyncThunk<any, void, ThunkApiFields>(
    'rewardsOwed/init',
    async (_, { getState }) => {
        const { address } = getState().currentAccount
        return await RewardsService.findAllRewards(address)
    }
)

export const {} = rewardsOwedSlice.actions

export default rewardsOwedSlice.reducer