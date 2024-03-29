<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [createMixinTarget](./type-tls.createmixintarget.md)

## createMixinTarget() function

创建用于混合目标工具函数

<b>Signature:</b>

```typescript
export declare function createMixinTarget<T>(target: T): <M>(m: M & ThisType<T & M>) => M & ThisType<T & M> & T;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  target | T |  |

<b>Returns:</b>

&lt;M&gt;(m: M &amp; ThisType&lt;T &amp; M&gt;) =&gt; M &amp; ThisType&lt;T &amp; M&gt; &amp; T

可以用于 混合目标 的便利函数

## Remarks

它返回的便利函数的功能与 [mixinTarget()](./type-tls.mixintarget.md) 的功能一样，唯一区别是不再需要接收 target 参数了

