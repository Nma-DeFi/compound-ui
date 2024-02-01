import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type ThunkApiFields = { dispatch: AppDispatch; state: RootState } 

export type AsyncStatusStrType = 'idle' | 'loading' | 'success' | 'error';

export type AsyncStatusType = {
    isIdle: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
}

export const AsyncStatus = {
    Idle: { isIdle: true, isLoading: false, isSuccess: false, isError: false },
    Loading: { isIdle: false, isLoading: true, isSuccess: false, isError: false  },
    Success: { isIdle: false, isLoading: false, isSuccess: true, isError: false },
    Error: { isIdle: false, isLoading: false, isSuccess: false, isError: true },
}
