import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type ThunkApiFields = { dispatch: AppDispatch; state: RootState } 

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

