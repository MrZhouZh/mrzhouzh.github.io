---
title: 算法-二分查找左边界
date: 2023-03-07
---

## 二分查找左边界

> 实现原理: 传入的是一个有序的数组, 左右递减, 取中间下标进行匹配, 如果中值小于目标值, 左下标向右移动一位, 小于则右下标等于中下标, 缩小搜索边界

```js
const binarySearchLeftBound = (nums, target) => {
  // let left = 0,
  //   right = nums.length

  // while(left < right) {
  //   const mid = left + ((right - left) >> 1)
  //   if (nums[mid] < target) {
  //     left = mid + 1
  //   } else {
  //     right = mid
  //   }
  // }

  // return nums[left] === target ? left : -1
  // --- TODO: Test case ---
  let left = 0,
    right = nums.length - 1

  while(left <= right) {
    const mid = left + ((right - left) >> 1)
    if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return nums[left] === target ? left : -1
}

// ---------- Test ---------
const nums = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 6];
const target = 5
console.log(binarySearchLeftBound(nums, target))
// 4
```
