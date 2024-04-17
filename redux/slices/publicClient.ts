import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PublicClient } from 'viem';

interface PublicClientState {
    publicClient: PublicClient
}

const initialState: PublicClientState = {
    publicClient: undefined,
}

export const publicClientSlice = createSlice({
    name: 'publicClient',
    initialState,
    reducers: {
        publicClientUpdated: (state: PublicClientState, action: PayloadAction<PublicClient>) => {
            state.publicClient = action.payload
        },
    },
})

export const { publicClientUpdated } = publicClientSlice.actions

export default publicClientSlice.reducer