// JavaScript 的标识符 正则
const jsIdentifier = /^[A-Za-z_$]+[\w$]*$/;

/**
 * 判断 code 是否是有校的 js 标识符
 * @param code - 标识符的字符串
 */
export function isIdentifier(code: string): boolean {
    return jsIdentifier.test(code);
}

/**
 * 箭头函数的正则列表
 */
const arrowFunctionRegExpListOfFunString = [
    /**
     * 匹配箭头函数： singleParam => { statements }
     * $1: async
     * $2: 函数名字
     */
    /^\s*(async\s+)?\s*(\b[A-Za-z_$]+[\w$]*\b)\s*=>/,

    /**
     * 匹配箭头函数： (param1, param2, …, paramN) => { statements }
     * $1: async
     * $2: 函数的第一个参数的名字
     * $3: 函数的剩余参数的名字的区域
     * $4: 函数的剩余参数的名字
     */

    /^\s*(async\s+)?\s*\(\s*(\b[A-Za-z_$]+[\w$]*\b)?\s*(,\s*(\b[A-Za-z_$]+[\w$]*\b)\s*)*\)\s*=>/,
];

/**
 * 箭头函数的正则
 * 其实是 arrowFunctionRegExpListOfFunString 中两个正则的组合
 */
const arrowFunctionRegExpOfFunString = /(^\s*(async\s+)?\s*(\b[A-Za-z_$]+[\w$]*\b)\s*=>)|(^\s*(async\s+)?\s*\(\s*(\b[A-Za-z_$]+[\w$]*\b)?\s*(,\s*(\b[A-Za-z_$]+[\w$]*\b)\s*)*\)\s*=>)/;

/**
 * 判断函数是否是箭头函数
 * @param fun - 被判断的函数
 */
export function isArrowFunction(fun: Function): boolean {
    const funStr = fun.toString();
    return arrowFunctionRegExpOfFunString.test(funStr);
}

/**
 * 异步函数的构造函数
 * 浏览器好像没爆暴该构造函数
 */
const AsyncFun = (globalThis as any).AsyncFunction ?? async function () { }.constructor;

/**
 * 判断函数是否是 async 异步函数
 * @remarks
 * 异步函数 不包含 异步生成器函数 AsyncGeneratorFunction
 * @param fun - 被判断的函数
 */
export function isAsyncFunction(fun: Function): boolean {
    return fun instanceof AsyncFun;
}

/**
 * 生成器函数的构造函数
 * 浏览器好像没爆暴该构造函数
 */
const GeneratorFun =
    (globalThis as any).GeneratorFunction ?? function* () { }.constructor;

/**
 * 判断函数是否是生成器函数
 *
 * @remarks
 * 生成器函数 不包含 异步生成器函数 AsyncGeneratorFunction
 * @param fun - 被判断的函数
 */
export function isGeneratorFunction(fun: Function): boolean {
    return fun instanceof GeneratorFun;
}

/**
 * 异步生成器函数的构造函数
 * 浏览器好像没爆暴该构造函数
 */
const AsyncGeneratorFun =
    (globalThis as any).AsyncGeneratorFunction ??
    async function* () { }.constructor;

/**
 * 判断函数是否是异步生成器函数
 * @param fun - 被判断的函数
 */
export function isAsyncGeneratorFunction(fun: Function): boolean {
    return fun instanceof AsyncGeneratorFun;
}

/**
 * 函数名字的正则表达式
 *
 * @remarks
 * 注意：
 * 2020年6月17日测试：IOS 和 Mac 的 Safari 不支持 后行断言 `(?<=)` 和 `(?<!)`
 * 为了保证兼容性，先后行都不用
 * 
 */
// const funNameRegExpOfFunString = /(?<=^\s*(async\s+)?function\s*(\s|\*)\s*)[A-Za-z_$]+[\w$]*(?=\s*\()/;   // 函数名字正则-后行断言版

/**
 * $1：函数名字前的部分
 * $2: 异步函数标识符 async
 * $3: * 标识符
 */
const funNameRegExpOfFunString = /(^\s*(async\s+)?function\s*(\s|\*)\s*)[A-Za-z_$]+[\w$]*(\s*\()/;

/**
 * 判断是否是匿名函数
 *
 * @remarks
 * 判断函数在被定义时是否是通过匿名函数来定义的。
 * 匿名函数是指声明函数时没有写名字的函数。
 * 注意：即使是匿名函数，函数对象上的 name 属性也可能是有值的，因为 js解析器 会自动将 函数表达式函数变量的名字作为匿名函数的名字，如下：
 * ```ts
 * var funName = function(){};
 * ```
 * 其中的匿名函数对象的 name 属性的值会是 `funName`
 * 
 * 如果 函数对象上的 name 属性的值为 `""`，函数一定是匿名函数。
 */
export function isAnonymousFunction(fun: Function): boolean {
    if (fun.name){
        const funStr = fun.toString();
        return !funNameRegExpOfFunString.test(funStr);
    }
    return true;
}




/**
 * 表示任意的函数类型
 */
 export type AnyFunction = (...args:any)=>any;
