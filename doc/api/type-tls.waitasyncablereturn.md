<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [WaitAsyncableReturn](./type-tls.waitasyncablereturn.md)

## WaitAsyncableReturn type

waitAsyncable 的返回值的类型

<b>Signature:</b>

```typescript
export declare type WaitAsyncableReturn<Result, Return> = Return extends Promise<any> ? Return : (Result extends Promise<any> ? Promise<Return> : Return);
```