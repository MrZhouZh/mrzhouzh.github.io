---
title: 算法-冒泡排序
date: 2023-03-03
---

> 实现原理: 双层循环比较两个记录键值的大小, 如果这两个记录键值的大小出现逆序, 则交换这两个记录键值

```
时间复杂度: O(n^2)
空间复杂度: O(1)
```

```js
const bubbleSort = (arr) => {
  for(let i = 1, len = arr.length; i < len; i++) {
    let hasChange = false
    for(let j = i; j > 0; j--) {
      if (arr[j] < [arr[j - 1]]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
        hasChange = true
      }
    }
    // 如果为 false, 表示所有元素都到位
    if (!hasChange) break
  }
  return arr
}

// ---------- Test ---------
console.log(bubbleSort([1, 3, 6, 8, 0, 9, 4]))
```
