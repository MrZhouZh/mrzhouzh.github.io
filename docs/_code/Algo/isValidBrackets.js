/**
 * 检查括号是否有效
 * @param {string} str 
 * @returns boolean
 * 
 * 时间复杂度: O(n)
 * 空间复杂度: O(n + |∑|). ∑ 指的是字符集, 括号数为 6, 则 ∑ = 6
 */
const isValidBrackets = (str = '') => {
  if (str.length % 2 === 1) return false

  // 字面量对象
  // const map = {
  //   '{': '}',
  //   '[': ']',
  //   '(': ')'
  // }

  // const stack = []
  // for (const char of str) {
  //   if (map[char]) {
  //     stack.push(char)
  //   } else {
  //     if (stack.length === 0 || char !== map[stack.pop()]) {
  //       return false
  //     }
  //   }
  // }

  // map
  const map = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ])

  const stack = []
  for (const char of str) {
    if (map.has(char)) {
      stack.push(char)
    } else {
      if (stack.length === 0 || char !== map.get(stack.pop())) {
        return false
      }
    }
  }

  return !stack.length

  // replace
  // refs: https://leetcode.cn/problems/valid-parentheses/solution/by-mr-wang-y-p-uz6a/
  // 有效的长度只需取一半
  // const len = str.length / 2
  // for (let i = 0; i < len; i++) {
  //   str = str.replace('{}', '')
  //     .replace('[]', '')
  //     .replace('()', '') 
  // }

  // return str.length === 0
}

// ---------- Test ----------
const str = '{]()}[}[{])(()'
const str2 = '()[]{}'
const str3 = '(]'
console.log(isValidBrackets(str)) // false
console.log(isValidBrackets(str2))  // true
console.log(isValidBrackets(str3))  // false
