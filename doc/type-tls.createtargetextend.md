<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [createTargetExtend](./type-tls.createtargetextend.md)

## createTargetExtend() function

创建用于扩展目标的便捷函数

<b>Signature:</b>

```typescript
export declare function createTargetExtend<C extends ClassType>(cla: C): <E>(ext: E & ThisType<InstanceType<C> & E>) => E & ThisType<C & E>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  cla | C | 扩展的目标，也用作 this 的类型 |

<b>Returns:</b>

&lt;E&gt;(ext: E &amp; ThisType&lt;InstanceType&lt;C&gt; &amp; E&gt;) =&gt; E &amp; ThisType&lt;C &amp; E&gt;

可以用于 扩展目标 的便利函数

## Remarks

它返回的便利函数的功能与 [targetExtend()](./type-tls.targetextend.md) 的功能一样，唯一区别是不再需要接收 cla 参数了
