/**
 * 判断目标是否是对象类型
 * @param target : any   目标对象
 *
 * 仅通过 target instanceof Object 判断是不行的，因为 对于 Object.create(null) 创建的对象 通过 ` Object.create(null) instanceof Object ` 来判断 返回的是 false
 * 即：通过 Object.create(null) 创建的对象是不被 instanceof  认为是继续于 Object 的
 *
 * typeof null 也返回 "object"
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
export type LooseTypeString = "undefined" | "null" | "Function" | "object" | string;






/**
 * 精确类型
 *
 * 在精准类型中认为 JavaScript 的原始类型（非对象类型） 与 其对应的 包装类型（类类型）是不同的类型，即：
 * number 和  Number、string 和 String、boolean 和 Boolean 等 是不同的类型；
 * 对于原始类型，返回的结果 会与 typeof 返回的结果一样；
 * 但，对于 undefined 和 null 会返回其自身值（即 undefined 和 null）作为类型值
 *
 * 各种类型的值 与 该方法的返回值 的映射如下：
 * undefined ：undefined
 * null : null
 * string : "string"
 * number : "number"
 * bigint : "bigint"
 * boolean : "boolean"
 * symbol : "symbol"
 * function : Function
 * 没有原型的对象(如：通过 Object.create(null) 创建的对象) : "object"
 * 其它任何类型的实例  : 返回该实例的构造函数
 */
export type ExactType = LooseType | Exclude<TypeOfReturnType, "undefined" | "function" | "object">;





/**
 * 精确类型的字符串表示
 *
 * 在精准类型中认为 JavaScript 的原始类型（非对象类型） 与 其对应的 包装类型（类类型）是不同的类型，即：
 * number 和  Number、string 和 String、boolean 和 Boolean 等 是不同的类型；
 * 对于原始类型，返回的结果 会与 typeof 返回的结果一样；
 * 但，对于 null 会返回 "null"
 *
 * 各种类型的值 与 该方法的返回值 的映射如下：
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
 */
export type ExactTypeString = LooseTypeString | Exclude<TypeOfReturnType, "undefined" | "function" | "object">;






/**
 * 获取 inst 的宽松类型
 * @param inst : any
 * @returns LooseType    inst 的类型
 *
 *
 *
 * 注意：
 * 本方法返回的结果如下：
 * undefined ：undefined
 * null ： null
 * function : Function
 * 没有原型的对象(如：通过 Object.create(null) 创建的对象) : "object"
 * 其它任何类型的实例  : 返回该实例的构造函数  或 包装对象的构造函数
 *
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
 * @param t
 * @return ExactTypeString
 */
export function getStringOfType(t:ExactType):ExactTypeString{

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
 * 根据类型的名字获取类型
 * @param typeName
 */
export function getTypeByName(typeName:string):Function|undefined {
    return (<any>globalThis)[typeName]
}



/**
 * 获取 inst 的类型字符串
 * @param inst : any
 * @returns string    inst 的类型字符串
 *
 *
 *
 * 注意：
 * 本方法返回的结果如下：
 * undefined ："undefined"
 * null ： "null"
 * 没有原型的对象(如：通过 Object.create(null) 创建的对象) : "object"
 * 其它任何类型的实例  : 返回该实例的构造函数  或 包装对象的构造函数 的函数名字
 *
 */
export function getTypeStringOf(inst:any):LooseTypeString {
    let t = getTypeOf(inst);
    return getStringOfType(t);
}







/**
 * 获取 inst 的精确类型
 * @param inst : any
 * @returns ExactType    inst 的类型
 */
export function getExactTypeOf(inst:any):ExactType  {
    if (inst == null || isObject(inst)){
        return getTypeOf(inst);
    }
    return (typeof inst) as ExactType;
}




/**
 * 获取 inst 的精确类型的字符串表示
 * @param inst : any
 * @returns ExactTypeString    inst 的类型字符串
 */
export function getExactTypeStringOf(inst:any):ExactTypeString {
    var t = getExactTypeOf(inst);
    return getStringOfType(t);
}


/**
 * 判断 data 是否是 基本类型
 * @param data
 *
 * 基本类型 是指 那些不是 对象类型的类型，即，除了 object 和 function  类型以外，其它的都是基本类型，null 也算怎是 基本类型
 */
export function isBaseType(data:any):boolean {
    var typeStr = typeof data;
    return data == null || (typeStr !== "object" && typeStr !== "function");
}
