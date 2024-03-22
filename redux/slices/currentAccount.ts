import { createSlice } from '@reduxjs/toolkit'
import { Address } from 'viem'


interface CurrentAccountState {
    address: Address
    isConnected: boolean
}

export const NotConnected : CurrentAccountState = {
    address: undefined,
    isConnected: false,
}

export const currentAccountSlice = createSlice({
    name: 'currentAccount',
    initialState: NotConnected,
    reducers: {
        connected: (state, action) => {
            state.address = action.payload
            state.isConnected = true
        },
        disconnected: (state) => {
            state.address = undefined
            state.isConnected = false
        },
    },
})

export const accountConnected = address => {
    return (dispatch) => {
        dispatch(connected(address))
    }
}

export const accountDisconnected = () => {
    return (dispatch) => {
        dispatch(disconnected())
    }
}
  
export const { connected, disconnected } = currentAccountSlice.actions

export default currentAccountSlice.reducer