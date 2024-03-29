<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [defineMixin](./type-tls.definemixin.md)

## defineMixin() function

定义混合的类型便利函数

<b>Signature:</b>

```typescript
export declare function defineMixin<T, M>(target: T, mixin: M & ThisType<T & M>): M & ThisType<T & M>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  target | T | 混合的目标，用作 this 的类型 |
|  mixin | M &amp; ThisType&lt;T &amp; M&gt; | 混合对象，会自动更改其this的类型 |

<b>Returns:</b>

M &amp; ThisType&lt;T &amp; M&gt;

返回注入了 this 类型的 mixin 对象本身

## Remarks

它会更改 mixin 中方法的this指向为 target &amp; mixin，不会真的执行混合操作

