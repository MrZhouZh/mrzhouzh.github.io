/**
 * 插入排序
 * @param {number[]} arr 
 * @returns number[]
 */
const insertionSort = (arr) => {
  if (arr.length <= 1) return
  // console.time('--insertion sort--')
  for(let i = 1, len = arr.length; i < len; i++) {
    let j = i - 1
    if (arr[i] < arr[j]) {
      let temp = arr[i]
      while(j >= 0 && temp < arr[j]) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = temp
    }
  }

  // console.timeEnd('--insertion sort--')
  return arr
}

// ---------- Test ----------
console.log(insertionSort([8, 4, 3, 6, 9, 0, 2]))
// [0, 2, 3, 4, 6, 8, 9]
