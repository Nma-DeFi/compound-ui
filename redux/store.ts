import { configureStore } from '@reduxjs/toolkit'
import currentChainReducer from './slices/currentChain'
import currentAccountReducer from './slices/currentAccount'
import marketLogicReducer from './slices/marketLogic'
import marketDataReducer from './slices/marketData'

export const store = configureStore({
    reducer: {
        currentChain: currentChainReducer,
        currentAccount: currentAccountReducer,
        marketLogic: marketLogicReducer,
        marketData: marketDataReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false,
    }),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch