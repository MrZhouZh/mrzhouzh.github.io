/**
 * 找到所有n位十进制的水仙花数
 * @param {number} n 几位数
 * @returns {number[]}
 * 
 * 153 = 1**3 + 5**3 + 3**3
 * 1634 = 1**4 + 6**4 + 3**4 + 4**4
 * 
 * 示例:
 * findAllNarcissistic(3)
 * output: [153, 370, 371, 407]
 * findAllNarcissistic(4)
 * output: [1634, 8208, 9474]
 */
const findAllNarcissistic = (n) => {
  const narcissistics = []
  // 初始值就取几位数的开始 4位数 => 1000
  const start = 10 ** (n - 1)
  // 初始值就取几位数的结束 4位数 => 9999
  const end = 10 ** n - 1
  for (let i = start; i <= end; i++) {
    if (isNarcissistic(i)) {
      narcissistics.push(i)
    }
  }
  return narcissistics
}

// 判断是不是水仙花数
function isNarcissistic(n) {
  const str = String(n)
  return [...str].reduce((prev, curr) =>
    prev += ((+curr) ** str.length)
  , 0) === n
}

console.log(isNarcissistic(152))  // false
console.log(isNarcissistic(153))  // true
console.log(isNarcissistic(370))  // true
console.log(isNarcissistic(371))  // true
console.log(isNarcissistic(1634)) // true
console.log(findAllNarcissistic(3))  // [153, 370, 371, 407]
console.log(findAllNarcissistic(4))  // [1634, 8208, 9474]
