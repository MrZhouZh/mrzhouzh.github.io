---
title: 算法-插入排序
date: 2023-03-03
---

> 实现原理: 把当前遍历的元素取出, 在序列中找到一个合适的位置插入, 第二层循环不必遍历当前元素之前的所有元素, 因为当前元素之前的序列都是排好序的, 碰到第一个小于当前元素的值, 就可以停止继续向前查找. 然后把当前元素插入当前位置即可

```js
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
```
