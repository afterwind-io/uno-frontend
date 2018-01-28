/**
 * 简单深拷贝
 * 
 * @export
 * @template T 对象类型
 * @param {T} data 能够被JSON化并还原的任意数据结构
 * @returns {T} 深拷贝对象
 */
export function deepclone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}
