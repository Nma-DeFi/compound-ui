import BigNumber from "bignumber.js";

export type AsyncStatusType = {
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export type AsyncData<T> = { data: T } & AsyncStatusType
export type AsyncNumber = AsyncData<number>
export type AsyncBigNumber = AsyncData<BigNumber>
export type AsyncBoolean = AsyncData<boolean>

export const AsyncStatus = {
    Idle: { isIdle: true, isLoading: false, isSuccess: false, isError: false },
    Loading: { isIdle: false, isLoading: true, isSuccess: false, isError: false },
    Success: { isIdle: false, isLoading: false, isSuccess: true, isError: false },
    Error: { isIdle: false, isLoading: false, isSuccess: false, isError: true },
}

export const IdleData : AsyncData<any> = {
    data: undefined,
    ...AsyncStatus.Idle
}

export const LoadingData : AsyncData<any> = {
    data: undefined,
    ...AsyncStatus.Loading
}

export function SuccessData<T>(value: T) : AsyncData<T> {
     return ({
        data: value,
        ...AsyncStatus.Success
    }) 
}

export function loadAsyncData<T>(promise: Promise<T>, setData: (d: AsyncData<T>) => void) : void {
    setData({ data: undefined, ...AsyncStatus.Loading })
    promise.then(d => setData({data: d, ...AsyncStatus.Success }))
          .catch(e => setData({data: e, ...AsyncStatus.Error }))
}

export function fromUseQueryAsync(uqAsync): AsyncData<any>  {
    return ({
        isIdle: uqAsync.isPending, 
        isLoading: uqAsync.isLoading, 
        isError: uqAsync.isError, 
        isSuccess: uqAsync.isSuccess, 
        data: uqAsync.data,
  })
}