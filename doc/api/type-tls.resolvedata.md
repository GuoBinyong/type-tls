<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [ResolveData](./type-tls.resolvedata.md)

## ResolveData type

获取 Promise 解决的类型的值

<b>Signature:</b>

```typescript
export declare type ResolveData<P> = P extends Promise<infer D> ? D : P;
```

## Remarks

对于非 Promise 类型的值，返回原类型本身

