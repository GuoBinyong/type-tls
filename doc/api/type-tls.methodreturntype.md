<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [MethodReturnType](./type-tls.methodreturntype.md)

## MethodReturnType type

获取对象的方法的返回的类型

<b>Signature:</b>

```typescript
export declare type MethodReturnType<Obj, Method extends keyof Obj> = Obj[Method] extends AnyFunction ? ReturnType<Obj[Method]> : never;
```
<b>References:</b> [AnyFunction](./type-tls.anyfunction.md)

