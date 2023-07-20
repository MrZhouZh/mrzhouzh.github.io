/**
 * 冒泡排序
 * @param {number[]} arr 
 * @returns number[]
 */
const bubbleSort = (arr) => {
  if (arr.length <= 1) return arr
  // console.time('--bubble sort--')
  for(let i = 0, len = arr.length - 1; i < len; i++) {
    let hasChange = false
    for(let j = 0; j < len; j++) {
      if (arr[j] > [arr[j + 1]]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        hasChange = true
      }
    }
    // 如果为 false, 表示所有元素都到位
    if (!hasChange) break
  }
  // console.timeEnd('--bubble sort--')
  return arr
}

// ---------- Test ---------
console.log(bubbleSort([1, 3, 6, 8, 0, 9, 4]))
// [0, 1, 3, 4, 6, 8, 9]
