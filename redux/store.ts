import { configureStore } from '@reduxjs/toolkit'
import currentChain from './slices/currentChain'
import currentAccount from './slices/currentAccount'
import marketLogic from './slices/marketLogic'
import marketData from './slices/marketData'

export const store = configureStore({
  reducer: {
    currentChain, currentAccount,
    marketLogic, marketData
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })
})