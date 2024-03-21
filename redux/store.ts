import { configureStore } from '@reduxjs/toolkit'
import currentAccount from './slices/currentAccount'
import currentChain from './slices/currentChain'
import currentMarket from './slices/currentMarket'
import publicClient from './slices/publicClient'
import supplyPositions from './slices/positions/supplyPositions'
import borrowPositions from './slices/positions/borrowPositions'
import collateralPositions from './slices/positions/collateralPositions'

export const store = configureStore({
  reducer: {
    currentChain, 
    currentAccount,
    currentMarket,
    publicClient,
    supplyPositions,
    borrowPositions,
    collateralPositions,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })
})