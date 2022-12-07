/**
 * 处理类型相关的工具
 * @remarks
 * type-tls 封装了与类型相关的工具，比如获取数据的类型 或 类型名字、判断数据的类型 等
 * 
 * @packageDocumentation
 */





/**
 * 判断目标是否是对象类型
 * 
 * @remarks
 * 仅通过 target instanceof Object 判断是不行的，因为 对于 Object.create(null) 创建的对象 通过 ` Object.create(null) instanceof Object ` 来判断 返回的是 false
 * 即：通过 Object.create(null) 创建的对象是不被 instanceof  认为是继续于 Object 的
 *
 * typeof null 也返回 "object"
 * 
 * @param target : any   目标对象
 */
export function isObject(target:any):boolean {
    // return target instanceof Object || typeof target === "object"
    var tarType = typeof target;
    return  target && (tarType === "object" || tarType === "function");
}






/**
 * typeof 的返回类型
 */
export type TypeOfReturnType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";





/**
 * 宽松的类型
 */
export type LooseType = undefined | null | Function | "object";




/**
 * 宽松类型的字符串表示
 */
export type LooseTypeName = "undefined" | "null" | "Function" | "object" | string;






/**
 * 精确类型
 * 
 * @remarks
 * 在精准类型中认为 JavaScript 的原始类型（非对象类型） 与 其对应的 包装类型（类类型）是不同的类型，即：
 * number 和  Number、string 和 String、boolean 和 Boolean 等 是不同的类型；
 * 对于原始类型，返回的结果 会与 typeof 返回的结果一样；
 * 但，对于 undefined 和 null 会返回其自身值（即 undefined 和 null）作为类型值
 *
 * 各种类型的值 与 该方法的返回值 的映射如下：
 * ```
 * undefined ：undefined
 * null : null
 * string : "string"
 * number : "number"
 * bigint : "bigint"
 * boolean : "boolean"
 * symbol : "symbol"
 * function : Function
 * 没有原型的对象(如：通过 `Object.create(null)` 创建的对象) : "object"
 * 其它任何类型的实例  : 返回该实例的构造函数
 * ```
 */
export type ExactType = LooseType | Exclude<TypeOfReturnType, "undefined" | "function" | "object">;





/**
 * 精确类型的字符串表示
 * 
 * @remarks
 * 在精准类型中认为 JavaScript 的原始类型（非对象类型） 与 其对应的 包装类型（类类型）是不同的类型，即：
 * number 和  Number、string 和 String、boolean 和 Boolean 等 是不同的类型；
 * 对于原始类型，返回的结果 会与 typeof 返回的结果一样；
 * 但，对于 null 会返回 "null"
 *
 * 各种类型的值 与 该方法的返回值 的映射如下：
 * ```
 * undefined ："undefined"
 * null : "null"
 * function : "Function"
 * string : "string"
 * number : "number"
 * bigint : "bigint"
 * boolean : "boolean"
 * symbol : "symbol"
 * 没有原型的对象(如：通过 Object.create(null) 创建的对象) : "object"
 * 其它任何类型的实例  : 返回该实例的构造函数的名字
 * ```
 */
export type ExactTypeName = LooseTypeName | Exclude<TypeOfReturnType, "undefined" | "function" | "object">;






/**
 * 获取 inst 的宽松类型
 * 
 * @remarks
 * 注意：
 * 本方法返回的结果如下：
 * ```
 * undefined ：undefined
 * null ： null
 * function : Function
 * 没有原型的对象(如：通过 Object.create(null) 创建的对象) : "object"
 * 其它任何类型的实例  : 返回该实例的构造函数  或 包装对象的构造函数
 * ```
 * 
 * 
 * @param inst
 * @returns inst 的类型
 */
export function getTypeOf(inst:any):LooseType {
    var typeInfo = inst;
    if (inst != null){
        typeInfo = inst.constructor;
        if (typeInfo == undefined){
            typeInfo = typeof inst;
        }
    }
    return typeInfo;
}


/**
 * 获取 类型的字符串表示
 * 
 * @param t - 一个 ExactType 类型的值
 * @return t 的字符串表示的类型
 */
export function getNameOfType(t:ExactType):ExactTypeName{

    switch (t){
        case undefined: return  "undefined";
        case null:return  "null";
    }

    let tType = typeof t;
    switch (tType) {
        case "function":return (<Function>t).name;
        case "string":return  t as string;
        default:return  tType;
    }

}


/**
 * 根据类型的名字获取其对应的类
 * @param typeName - 类型的名字
 */
export function getTypeByName(typeName:string):Function|undefined {
    return (<any>globalThis)[typeName]
}



/**
 * 获取 inst 的类型字符串
 * 
 * @remarks
 * 注意：
 * 本方法返回的结果如下：
 * undefined ："undefined"
 * null ： "null"
 * 没有原型的对象(如：通过 Object.create(null) 创建的对象) : "object"
 * 其它任何类型的实例  : 返回该实例的构造函数  或 包装对象的构造函数 的函数名字
 * 
 * @param inst 
 * @returns  inst 的类型字符串
 */
export function getTypeNameOf(inst:any):LooseTypeName {
    let t = getTypeOf(inst);
    return getNameOfType(t);
}







/**
 * 获取 inst 的精确类型
 * @param inst
 * @returns inst 的类型
 */
export function getExactTypeOf(inst:any):ExactType  {
    if (inst == null || isObject(inst)){
        return getTypeOf(inst);
    }
    return (typeof inst) as ExactType;
}




/**
 * 获取 inst 的精确类型的字符串表示
 * @param inst
 * @returns  inst 的类型字符串
 */
export function getExactTypeNameOf(inst:any):ExactTypeName {
    var t = getExactTypeOf(inst);
    return getNameOfType(t);
}


/**
 * 判断 data 是否是 基本类型
 * @remarks
 * 基本类型 是指 那些不是 对象类型的类型，即，除了 object 和 function  类型以外，其它的都是基本类型，null 也算怎是 基本类型
 * @param data - 任意类型的值
 */
export function isBaseType(data:any):boolean {
    var typeStr = typeof data;
    return data == null || (typeStr !== "object" && typeStr !== "function");
}








/**
 * 判断 target 是否为 类数组对象
 * @param target  -  目标
 * @returns
 */
export function isArrayLike(target: any): boolean {
    let length = target && target.length;
    return Number.isInteger(target.length) && length >= 0;
}







/**
 * 判断 目标 是否是可迭代的对象，即 实现了 可迭代协议
 * @param target - 目标
 */
export function isIterable(target:any):boolean{
    return target && (typeof target[Symbol.iterator] === "function")
}


/**
 * 判断 目标 是否是迭代器，即 实现了 迭代器协议
 * @param target - 目标
 */
export function isIterator(target:any):boolean{
    return target && (typeof target.next === "function")
}




//类型工具：---------------------------

/**
 * 将某个类型变为可选的类型
 */
export type Optional<T> = T | null | undefined; 

/**
 * 可选的布尔类型
 */
export type OptionalBoolean = Optional<boolean>;

/**
 * 获取值类型为指定类型的所有 key
 * 
 * @typeParam Target - 目标对象
 * @typeParam Value - 要获取的key的对应值的类型
 */
export type KeyOfValue<Target,Value> = {[K in keyof Target]:Target[K] extends Value ? K : never}[keyof Target];

/**
 * 获取值类型不是指定类型的所有 key
 * 
 * @typeParam Target - 目标对象
 * @typeParam Value - 被排除的值的类型
 */
export type KeyOfNonValue<Target,Value> = {[K in keyof Target]:Target[K] extends Value ? never : K }[keyof Target];


/**
 * 获取值类型包含指定类型的所有 key
 * 
 * @typeParam Target - 目标对象
 * @typeParam Value - 要获取的key的对应值应包含的类型
 */
export type KeyOfContainsValue<Target,Value> = {[K in keyof Target]:Value extends Target[K]  ? K : never}[keyof Target];

/**
 * 获取值类型不应包含指定类型的所有 key
 * 
 * @typeParam Target - 目标对象
 * @typeParam Value - 不应包含的值的类型
 */
export type KeyOfNonContainsValue<Target,Value> = {[K in keyof Target]:Value extends Target[K]  ? never : K}[keyof Target];



//类型替换工具：开始

/**
 * 可将源类型 SourType 中的 类型 MatchType 替换为 新的类型 NewType
 */
export type Replace<SourType, MatchType, NewType> = SourType extends MatchType ? NewType : SourType;

/**
 * 可将源类型 SourType 中的 undefined 替换为 新的类型 NewType
 */
export type ReplaceUndefined<SourType, NewType> = Replace<SourType, undefined, NewType>;

/**
 * 可将源类型 SourType 中的 null 替换为 新的类型 NewType
 */
export type ReplaceNull<SourType, NewType> = Replace<SourType, null, NewType>;

/**
 * 可将源类型 SourType 中的代表空的类型 void | undefined | null 替换为 新的类型 NewType
 */
export type ReplaceVoid<SourType, NewType> = Replace<SourType, void | undefined | null, NewType>;


//类型替换工具：结束
