/* 面经手写题抄录 */
/**
 * 将数组转为字符串
 * @param {array} list 
 * @returns {string}
 * 
 * @example
 * ```
 * const test = () => {
 *  const list = [
 *    {
 *      input: [1, 2, 3, [4, 5]],
 *      output: '[ 1 2 3 [ 4 5 ] ]'
 *    },
 *    {
 *      input: [79, [[88, 98], 99]],
 *      output: '[ 79 [ [ 88 98 ] 99 ] ]'
 *    },
 *  ]
 * 
 *  return list.map(item => {
 *    const res = stringify(item.input)
 *    return res === item.output
 *  })
 * }
 * // [true, true]
 * ```
 */
function stringify(list) {
  const _stringify = (list, res = '') => {
    res += '[ '
    for (const item of list) {
      if (Array.isArray(item)) {
        res += _stringify(item)
      } else {
        res += item
      }
    }
    res += '] '
    return res
  }

  return _stringify(list).replace(/\s$/, '')
}

/**
 * 平铺对象
 * @param {object} obj 
 * @returns
 * 
 * @example
 * ```
 * const obj = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }
 * flatObj(obj) // {a.b.c: 1, a.b.d: 2, a.e: 3, f.g: 2}
 * ``` 
 */
function flatObj(obj = {}) {
  let res = {}
  function flat(obj, preKey = '') {
    Object.entries(obj).forEach(([key, val]) => {
      const newKey = preKey ? `${preKey}.${key}` : key
      if (val && typeof val === 'object') {
        flat(val, newKey)
      } else {
        res[newKey] = val
      }
    })
  }

  flat(obj)
  return res
}
