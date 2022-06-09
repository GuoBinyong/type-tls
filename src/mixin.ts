/**
 * 混合
 * @internal
 */
export function mixin<T, S>(target: T, source: S): T & S;
/**
 * 混合
 * @internal
 */
export function mixin<T, S1, S2>(
  target: T,
  source1: S1,
  source2: S2
): T & S1 & S2;
/**
 * 混合
 * @internal
 */
export function mixin<T, S1, S2, S3>(
  target: T,
  source1: S1,
  source2: S2,
  source3: S3
): T & S1 & S2 & S3;
/**
 * 混合
 * @internal
 */
export function mixin<T, S1, S2, S3, S4>(
  target: T,
  source1: S1,
  source2: S2,
  source3: S3,

  source4: S3
): T & S1 & S2 & S3 & S4;
/**
 * 混合
 *
 * @remarks
 * 将 source 的所有成员混入 target 对象中。
 *
 * 与 `Object.assign()` 的功能类似，不同的是 `mixin()` 会在 target 对象中 保持 source 对象属性的  PropertyDescriptors
 *
 * @param target - 目标对象，所有 源对象 的属性都要被混入进到 目标对象中
 * @param sources - 源对象，所有 源对象 的属性都要被混入进到 目标对象中
 * @returns 混入后的 target
 */
export function mixin(target: any, ...sources: any[]): any;
export function mixin(target: any, ...sources: any[]): any {
  for (const s of sources) {
    const propDes = Object.getOwnPropertyDescriptors(s);
    Object.defineProperties(target, propDes);
  }
  return target;
}


/**
 * 定义混合的类型便利函数
 *
 * @remarks
 * 它会更改 mixin 中方法的this指向为 target & mixin，不会真的执行混合操作
 *
 * @param target - 混合的目标，用作 this 的类型
 * @param mixin - 混合对象，会自动更改其this的类型
 * @returns 返回注入了 this 类型的 mixin 对象本身
 */
export function defineMixin<T, M>(
  target: T,
  mixin: M & ThisType<T & M>
): M & ThisType<T & M> {
  return mixin;
}

/**
 * 创建定义混合的类型便利函数
 *
 * @remarks
 * 它返回的便利函数的功能与 {@link defineMixin} 的功能一样，唯一区别是不再需要接收 target 参数了
 *
 * @returns 可以用于 定义混合的 类型便利函数
 */
export function createDefineMixin<T>() {
  return function defineMixin<M>(
    target: T,
    mixin: M & ThisType<T & M>
  ): M & ThisType<T & M> {
    return mixin;
  };
}

/**
 * 混合目标
 *
 * @remarks
 * 与 {@link defineMixin} 的区别是：`targetMixin` 会执行对 target 的混合操作，而 {@link defineMixin} 不会
 *
 *
 * @param target - 混合的目标，用作 this 的类型
 * @param m - 混合对象，会自动更改其this的类型
 * @returns 返回注入了 this 类型的 mixin 对象本身
 */
export function targetMixin<T, M>(
  target: T,
  m: M & ThisType<T & M>
): M & ThisType<T & M> {
  mixin(target, m);
  return m;
}

/**
 * 创建用于混合目标的便捷函数
 *
 * @remarks
 * 它返回的便利函数的功能与 {@link targetMixin} 的功能一样，唯一区别是不再需要接收 target 参数了
 *
 * @param target - 混合的目标，用作 this 的类型
 * @returns 可以用于 混合目标 的便利函数
 */
export function createTargetMixin<T>(target: T) {
  return function targetMixin<M>(m: M & ThisType<T & M>): M & ThisType<T & M> {
    mixin(target, m);
    return m;
  };
}

/**
 * 混合目标
 *
 * @remarks
 * 会执行对 CEarth 类的扩展操作。
 * 与 {@link targetMixin} 的区别仅仅是返回类型不一样。
 *
 * @param target - 混合的目标，用作 this 的类型
 * @param m - 混合对象，会自动更改其this的类型
 * @returns 返回混合后的 target 对象
 */
export function mixinTarget<T, M>(
  target: T,
  m: M & ThisType<T & M>
): M & ThisType<T & M> & T {
  mixin(target, m);
  return target as M & ThisType<T & M> & T;
}

/**
 * 创建用于混合目标工具函数
 *
 * @remarks
 * 它返回的便利函数的功能与 {@link mixinTarget} 的功能一样，唯一区别是不再需要接收 target 参数了
 *
 * @returns 可以用于 混合目标 的便利函数
 */
export function createMixinTarget<T>(target: T) {
  return function mixinTarget<M>(
    m: M & ThisType<T & M>
  ): M & ThisType<T & M> & T {
    mixin(target, m);
    return target as M & ThisType<T & M> & T;
  };
}
