---
title: 算法-快排
date: 2023-03-04
---

##  快排(二分排序)

> 实现原理: 选择一个 "中轴", 所有小于"中轴"的移动到"中轴"的左侧, 大于放右侧

```js
const quickSort = (arr) => {
  if (arr.length <= 1) return arr

  // const pivotIndex = Math.floor(arr.length / 2)
  const pivotIndex = arr.length >> 1
  const pivot = arr.splice(pivotIndex, 1)[0]

  const left = [], right = []

  for(let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([pivot], quickSort(right))
}

// ---------- Test ----------
console.log(quickSort([76, 21, 34, 98, 55, 123, 50]))
// [21, 34, 50, 55, 76, 98, 123]
```
