import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import currentAccount from './slices/currentAccount'
import currentChain from './slices/currentChain'
import currentMarket from './slices/currentMarket'
import publicClient from './slices/publicClient'
import rewardsOwed from './slices/rewardsOwed'
import supplyPositions from './slices/positions/supplyPositions'
import borrowPositions from './slices/positions/borrowPositions'
import collateralPositions from './slices/positions/collateralPositions'

const logger = createLogger({
  duration: true,
  collapsed: (_getState, _action, logLevel) => !logLevel.error
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
    rewardsOwed,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger)
})