<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [waitAsyncable](./type-tls.waitasyncable.md)

## waitAsyncable() function

等待可异步的结果

<b>Signature:</b>

```typescript
export declare function waitAsyncable<Result, Return>(asyncable: Result, callback: WaitAsyncableCallback<Result, Return>): WaitAsyncableReturn<Result, Return>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  asyncable | Result | 可异步的结果 |
|  callback | [WaitAsyncableCallback](./type-tls.waitasyncablecallback.md)<!-- -->&lt;Result, Return&gt; |  |

<b>Returns:</b>

[WaitAsyncableReturn](./type-tls.waitasyncablereturn.md)<!-- -->&lt;Result, Return&gt;


## Remarks

当 asyncable 为同步值时，会同步调用 callback。 当 asyncable 为异步值时，会等待 asyncable 解决后再调用 callback。
