<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [type-tls](./type-tls.md) &gt; [ExactTypeName](./type-tls.exacttypename.md)

## ExactTypeName type

精确类型的字符串表示

<b>Signature:</b>

```typescript
export declare type ExactTypeName = LooseTypeName | Exclude<TypeOfReturnType, "undefined" | "function" | "object">;
```
<b>References:</b> [LooseTypeName](./type-tls.loosetypename.md)<!-- -->, [TypeOfReturnType](./type-tls.typeofreturntype.md)

## Remarks

在精准类型中认为 JavaScript 的原始类型（非对象类型） 与 其对应的 包装类型（类类型）是不同的类型，即： number 和 Number、string 和 String、boolean 和 Boolean 等 是不同的类型； 对于原始类型，返回的结果 会与 typeof 返回的结果一样； 但，对于 null 会返回 "null"

各种类型的值 与 该方法的返回值 的映射如下：

```
undefined ："undefined"
null : "null"
function : "Function"
string : "string"
number : "number"
bigint : "bigint"
boolean : "boolean"
symbol : "symbol"
没有原型的对象(如：通过 Object.create(null) 创建的对象) : "object"
其它任何类型的实例  : 返回该实例的构造函数的名字
```
