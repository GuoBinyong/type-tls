import { mixin } from "./mixin";

/**
 * 类的类型、构造函数的类型
 *
 * @typeParam Arg - 构建函数的参数类型
 * @typeParam Instance - 构建函数的返回的实例类型
 */
export interface ClassType<Arg extends any[] = any[], Instance = any> {
  new (...args: Arg): Instance;
}




/**
 * 用于定义扩展选项中的私有成员
 */
export interface PrivateMemberOfExtend<TargetType extends new (...args:any)=>any> {
  /**
   * 扩展类中用于定义在创建实例时的初始化的方法
   * @remarks
   * 该方法会在创建实例时自动执行，并将构建函数接收到的参数透传给方方法。
   * 
   * 注意：
   * _constructor  会被保存在 目标类中的 _constructors 属性中，它是一个数组。
   * 
   * 目标类 需要在自己的构建函数中逐个调用 cla._constructors 中的函数
   * 
   * @param args 
   */
     _constructor?:(...args: (TargetType extends new (...args: infer A) => any ? A : never)) => void;
}


/**
 * 定义扩展的类型便利函数
 *
 * @remarks
 * 它会更改 ext 中方法的this指向为 cla & ext，不会真的执行扩展操作。
 * 
 * 其中 ext._constructor  会被保存在 cla._constructors 属性中，它是一个数组。
 * 
 * cla 需要在自己的构建函数中逐个调用 cla._constructors 中的函数
 *
 * @param cla - 扩展的目标，用作 this 的类型
 * @param ext - 描述扩展内容的对象，会自动更改其this的类型
 * @returns 返回注入了 this 类型的 ext 对象本身
 */
export function defineExtend<C extends ClassType, E>(
  cla: C,
  ext: E & ThisType<InstanceType<C> & E> & PrivateMemberOfExtend<C>
): E & ThisType<C & E> {
  return ext;
}

/**
 * 扩展目标
 *
 * @remarks
 * 与 {@link defineExtend} 的区别是：`targetExtend` 会执行对 cla 的扩展操作，而 {@link defineExtend} 不会
 *
 *
 * @param cla - 扩展的目标，也用作 this 的类型
 * @param ext - 扩展描述对象，会自动更改其this的类型
 * @returns 返回注入了 this 类型的 ext 对象本身
 */
export function targetExtend<C extends ClassType, E>(
  cla: C,
  ext: E & ThisType<InstanceType<C> & E> & PrivateMemberOfExtend<C>
): E & ThisType<InstanceType<C> & E> {
  mixin(cla.prototype, ext);
  const _constructor = ext._constructor;
  if (typeof _constructor === 'function') {
    const target:any = cla;
    const _constructors =  target._constructors ?? ( target._constructors = []);
    _constructors.push(_constructor);
  }
  return ext;
}

/**
 * 创建用于扩展目标的便捷函数
 *
 * @remarks
 * 它返回的便利函数的功能与 {@link targetExtend} 的功能一样，唯一区别是不再需要接收 cla 参数了
 *
 * @param cla - 扩展的目标，也用作 this 的类型
 * @returns 可以用于 扩展目标 的便利函数
 */
export function createTargetExtend<C extends ClassType>(cla: C) {
  return function classExtend<E>(
    ext: E & ThisType<InstanceType<C> & E> & PrivateMemberOfExtend<C>
  ): E & ThisType<C & E> {
    // @ts-ignore
    targetExtend(cla,ext)
    return ext;
  };
}

/**
 * 扩展目标
 *
 * @remarks
 * 会执行对 CEarth 类的扩展操作。
 * 与 {@link targetExtend} 的区别仅仅是返回类型不一样。
 *
 * @param cla - 扩展的目标，也用作 this 的类型
 * @param ext - 扩展对象，会自动更改其this的类型
 * @returns 返回扩展后的 cla 对象
 */
export function extendTarget<C extends ClassType, E>(
  cla: C,
  ext: E & ThisType<InstanceType<C> & E> & PrivateMemberOfExtend<C>
): ClassType<ConstructorParameters<C>, E & ThisType<InstanceType<C> & E>> {
    // @ts-ignore
    targetExtend(cla,ext)
  return cla;
}

/**
 * 创建用于扩展目标工具函数
 *
 * @remarks
 * 它返回的便利函数的功能与 {@link extendTarget} 的功能一样，唯一区别是不再需要接收 cla 参数了
 *
 * @param cla - 扩展的目标，也用作 this 的类型
 * @returns 可以用于 扩展目标 的便利函数
 */
export function createExtendTarget<C extends ClassType>(cla: C) {
  return function extendTarget<E>(
    ext: E & ThisType<InstanceType<C> & E> & PrivateMemberOfExtend<C>
  ): ClassType<ConstructorParameters<C>, E & ThisType<InstanceType<C> & E>> {
        // @ts-ignore
        targetExtend(cla,ext)
    return cla;
  };
}
