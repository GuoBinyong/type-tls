
import {AnyFunction} from "./function"


/**
 * 获取对象的方法的某个参数的类型
 * 
 * @typeParam Obj - 对象
 * @typeParam Method - 对象方法的名字
 * @typeParam ParamIndex - 参数的索引个数
 */
export type MethodParams<Obj,Method extends keyof Obj,ParamIndex extends number> = Obj[Method] extends AnyFunction ? Parameters<Obj[Method]>[ParamIndex] : never;




/**
 * 获取对象的方法的返回的类型
 * 
 * @typeParam Obj - 对象
 * @typeParam Method - 对象方法的名字
 */
 export type MethodReturnType<Obj,Method extends keyof Obj> = Obj[Method] extends AnyFunction ? ReturnType<Obj[Method]>: never;