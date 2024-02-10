export type AsyncStatusType = {
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export type AsyncData<T> = { data: T } & AsyncStatusType

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

export function asyncExec<T>(promise: Promise<T>, setData: (d: AsyncData<T>) => void) {
    setData({ data: undefined, ...AsyncStatus.Loading })
    promise.then(d => setData({data: d, ...AsyncStatus.Success }))
        .catch(() => setData({data: undefined, ...AsyncStatus.Error }))
}
