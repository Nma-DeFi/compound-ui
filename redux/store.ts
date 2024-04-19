import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import currentAccount from './slices/currentAccount'
import currentChain from './slices/currentChain'
import currentMarket from './slices/currentMarket'
import publicClient from './slices/publicClient'
import supplyPositions from './slices/positions/supplyPositions'
import borrowPositions from './slices/positions/borrowPositions'
import collateralPositions from './slices/positions/collateralPositions'

const logger = createLogger({
  duration: true,
  collapsed: (_, __, logLevel) => !logLevel.error
})

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
  }).concat(logger)
})