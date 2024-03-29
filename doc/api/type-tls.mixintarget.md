<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [mixinTarget](./type-tls.mixintarget.md)

## mixinTarget() function

混合目标

<b>Signature:</b>

```typescript
export declare function mixinTarget<T, M>(target: T, m: M & ThisType<T & M>): M & ThisType<T & M> & T;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  target | T | 混合的目标，用作 this 的类型 |
|  m | M &amp; ThisType&lt;T &amp; M&gt; | 混合对象，会自动更改其this的类型 |

<b>Returns:</b>

M &amp; ThisType&lt;T &amp; M&gt; &amp; T

返回混合后的 target 对象

## Remarks

会执行对 CEarth 类的扩展操作。 与 [targetMixin()](./type-tls.targetmixin.md) 的区别仅仅是返回类型不一样。

