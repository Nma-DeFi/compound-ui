import { configureStore } from '@reduxjs/toolkit'
import currentChain from './slices/currentChain'
import currentAccount from './slices/currentAccount'
import marketLogic from './slices/marketLogic'
import marketData from './slices/marketData'
import supplyPositions from './slices/supplyPositions'
import publicClient from './slices/publicClient'


export const store = configureStore({
  reducer: {
    currentChain, 
    currentAccount,
    publicClient,
    marketLogic, 
    marketData,
    supplyPositions,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })
})