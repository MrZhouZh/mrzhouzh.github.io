/**
 * 递归
 * 下面这种递归造成了很多浪费, 重复计算多次
 * fib(6) =>
 *  (fib(5) + fib(4)) + (fib(4) + fib(3)) + (...)
 * @param {*} n 
 * @returns 
 */
// const fib = (n) => {
//   if (n < 2) return n
//   return fib(n - 1) + fib(n - 2)
// }

/**
 * 修改后
 * 将上一个值缓存下来
 * 
 * 计算逻辑为:
 * fib(6, 0, 1)
 * fib(5, 1, 1)
 * fib(4, 1, 2)
 * fib(3, 2, 3)
 * fib(2, 3, 5)
 * fib(1, 5, 8)
 * = 8
 */
const fib = (n, pre = 0, cur = 1) => {
  if (n === 0) return n
  if (n === 1) return cur
  return fib(n - 1, cur, pre + cur)
}

/**
 * 递推循环
 * [0, 1] = [1, 1 + 0]
 * [1, 1] = [1, 1 + 1]
 * [2, 2] = [2, 2 + 1]
 * [3, 3] = [3, 3 + 2]
 * @param {number} n 
 * @returns {number}
 */
const fib2 = (n) => {
  let cur = 0
  let next = 1
  let result = []
  while(n--) {
    // es5
    // let temp = cur
    // cur = next
    // next += temp
    // es6
    [cur, next] = [next, cur + next]
    result.push(cur)
  }

  return result
}

console.log(fib(6)) // 8
console.log(fib2(10)) // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

// f2 = 1 + 0 = 1
// f3 = f2 + f1  = 2
// f4 = f3 + f2 = 3
