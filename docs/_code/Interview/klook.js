/**
 * 客路旅行 (KLOOK) 笔试
 */

/**
 * 摄氏度转华氏摄氏度, 将结果四舍五入为最接近的整数
 * @param {number} number 
 * @param {'F' | 'C'} type 如果输入为C, 则表示将温标转华标
 * convertTemperature(32, 'F') // 输出: 0
 * convertTemperature(100, 'C') // 输出: 212
 */
function convertTemperature(number, type) {
  // C=(F-32)÷1.8，F=1.8×C+32
  const handler = {
    F: (n) => Math.round((n - 32) / 1.8),
    C: (n) => Math.round(1.8 * n + 32)
  }

  return handler[type](number)
}

console.log(convertTemperature(32, 'F')) // 输出: 0
console.log(convertTemperature(100, 'C')) // 输出: 212
console.log(convertTemperature(32, 'C')) // 输出: 89

/**
 * 数组按照给定的长度平均分组
 * @param {number[]} arr 
 * @param {number} size 
 * @returns {number[][]}
 */
function groupArrayElements(arr, size) {
  if (size > arr.length) {
    console.warn('size cannot be larger than array length.')
    return
  }
  // 每个分组最大长度, 最小为 1
  let chunkSize = Math.ceil(arr.length / size);
  const newArr = arr.slice(0)
  return Array.from(
    { length: size },
    (_, i) => {
      let group = []
      if (newArr.length <= chunkSize || (size - i) === newArr.length) {
        // 重新计算剩余平均分组长度
        chunkSize = Math.ceil(newArr.length / (size - i))
      }
      group.push(newArr.splice(0, chunkSize))
      return group
    }
  )
}

// 动态计算数组剩余长度

console.log(groupArrayElements([1, 2, 3, 4, 5], 2))
// 输出: [[1, 2, 3], [4, 5]]
console.log(groupArrayElements([1, 2, 3, 4, 5, 6], 7))
// 输出: [[1, 2], [3, 4], [5], [6]]
console.log(groupArrayElements([1, 2, 3, 4, 5, 6], 4))
// 输出: [[1, 2], [3, 4], [5], [6]]

