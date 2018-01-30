/**
 * 简单深拷贝
 *
 * @export
 * @template T 对象类型
 * @param {T} data 能够被JSON化并还原的任意数据结构
 * @returns {T} 深拷贝对象
 */
export function deepclone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

/**
 * 根据给定的条件返回经过过滤的数组
 *
 * 数组元素中可包含tuple[boolean, T]，若tuple[0]为真值，则tuple[1]会包含在结果数组中；
 * 若数组元素为T，则直接进入结果数组中；
 *
 * @export
 * @template T 数组元素的类型
 * @param {Array<T | [boolean, T]} items 需要被过滤的数组，元素类型可为T，或者为[boolean, T]的tuple
 * @returns {T[]} 经过过滤的仅包含类型T元素的数组
 */
export function filter<T>(items: Array<T | [boolean, T]>): T[] {
  return items.reduce((results, item) => {
    if (!Array.isArray(item)) {
      return results.concat(item);
    } else if (item[0]) {
      return results.concat(item[1]);
    } else {
      return results;
    }
  }, []);
}
