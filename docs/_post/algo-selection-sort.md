---
title: 算法-选择排序
date: 2023-03-03
---

## 选择排序

```js
const selectionSort = (arr) => {
  if (arr.length <= 1) return arr
  // console.time('--selection sort--')
  for(let i = 0, len = arr.length; i< len - 1; i++) {
    let minIndex = i
    for(let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    const temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  // console.timeEnd('--selection sort--')

  return arr
}

console.log(selectionSort([4, 8, 6, 2, 12, 0, 3]))
```
