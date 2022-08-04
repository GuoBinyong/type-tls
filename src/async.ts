

/**
 * 获取 Promise 解决的类型的值
 * @remarks
 * 对于非 Promise 类型的值，返回原类型本身
 */
export type ResolveData<P> = P extends Promise<infer D> ? D : P;



/**
 * waitAsyncable 的返回值的类型
 */
export type WaitAsyncableReturn<Result> = Result extends Promise<any> ? Result : Promise<Result> | Result;

/**
 * waitAsyncable 的回调函数的类型
 * @param result -  同步的结果
 * @param rejected - 异步是否被拒绝
 */
export type WaitAsyncableCallback<Result, Return> = (result: ResolveData<Result> | null | undefined, rejected: boolean) => Return;

/**
 * 等待可异步的结果
 * 
 * @remarks
 * 当 asyncable 为同步值时，会同步调用 callback。
 * 当 asyncable 为异步值时，会等待 asyncable 解决后再调用 callback。
 * 
 * @param asyncable - 可异步的结果
 * @param callback 
 * @returns 
 */
export function waitAsyncable<Result, Return>(asyncable: Result, callback: WaitAsyncableCallback<Result, Return>): WaitAsyncableReturn<Return> {
    if (asyncable instanceof Promise) {
        return asyncable.then((syncRes) => {
            return callback(syncRes, false);
        }, () => {
            return callback(undefined, true);
        }) as WaitAsyncableReturn<Return>;
    }
    return callback(asyncable as ResolveData<Result>, false) as WaitAsyncableReturn<Return>;
}