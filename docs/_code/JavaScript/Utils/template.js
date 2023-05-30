/**
 * Dead simple template engine, just like Python's `.format()`
 * @param {string} str 
 * @param  {...any[]} args 
 * @returns string
 * 
 * @example
 * ```
 * template(
 *  'Hello {0}! My name is {1}.',
 *  'World',
 *  'Zeke'
 * )
 * // Hello World! My name is Zeke.
 * ```
 */
function template(str, ...args) {
  return str.replace(/{(\d+)}/g, (match, key) => {
    const index = Number(key)
    if (Number.isNaN(index)) {
      return match
    }

    return args[index]
  })
}

