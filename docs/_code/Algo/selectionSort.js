/**
 * 选择排序
 * @param {number[]} arr 
 * @returns number[]
 */
const selectionSort = (arr) => {
  if (arr.length <= 1) return arr
  // console.time('--selection sort--')
  for(let i = 0, len = arr.length; i < len - 1; i++) {
    let minIndex = i
    for(let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      // const temp = arr[i]
      // arr[i] = arr[minIndex]
      // arr[minIndex] = temp
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  // console.timeEnd('--selection sort--')

  return arr
}

console.log(selectionSort([4, 8, 6, 2, 12, 0, 3]))
