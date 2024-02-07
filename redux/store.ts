import { configureStore } from '@reduxjs/toolkit'
import currentAccount from './slices/currentAccount'
import currentChain from './slices/currentChain'
import publicClient from './slices/publicClient'
import supplyPositions from './slices/supplyPositions'


export const store = configureStore({
  reducer: {
    currentChain, 
    currentAccount,
    publicClient,
    supplyPositions,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })
})