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
 * 定义扩展的类型便利函数
 *
 * @remarks
 * 它会更改 ext 中方法的this指向为 cla & ext，不会真的执行扩展操作
 *
 * @param cla - 扩展的目标，用作 this 的类型
 * @param ext - 描述扩展内容的对象，会自动更改其this的类型
 * @returns 返回注入了 this 类型的 ext 对象本身
 */
export function defineExtend<C extends ClassType, E>(
  cla: C,
  ext: E & ThisType<InstanceType<C> & E>
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
  ext: E & ThisType<InstanceType<C> & E>
): E & ThisType<InstanceType<C> & E> {
  mixin(cla.prototype, ext);
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
  return function targetExtend<E>(
    ext: E & ThisType<InstanceType<C> & E>
  ): E & ThisType<C & E> {
    mixin(cla.prototype, ext);
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
  ext: E & ThisType<InstanceType<C> & E>
): ClassType<ConstructorParameters<C>, E & ThisType<InstanceType<C> & E>> {
  mixin(cla.prototype, ext);
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
    ext: E & ThisType<InstanceType<C> & E>
  ): ClassType<ConstructorParameters<C>, E & ThisType<InstanceType<C> & E>> {
    mixin(cla.prototype, ext);
    return cla;
  };
}
