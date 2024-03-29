<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [targetMixin](./type-tls.targetmixin.md)

## targetMixin() function

混合目标

<b>Signature:</b>

```typescript
export declare function targetMixin<T, M>(target: T, m: M & ThisType<T & M>): M & ThisType<T & M>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  target | T | 混合的目标，用作 this 的类型 |
|  m | M &amp; ThisType&lt;T &amp; M&gt; | 混合对象，会自动更改其this的类型 |

<b>Returns:</b>

M &amp; ThisType&lt;T &amp; M&gt;

返回注入了 this 类型的 mixin 对象本身

## Remarks

与 [defineMixin()](./type-tls.definemixin.md) 的区别是：`targetMixin` 会执行对 target 的混合操作，而 [defineMixin()](./type-tls.definemixin.md) 不会

