---
title: 算法-二分查找右边界
date: 2023-03-08
---

## 二分查找右边界

> 实现原理: 传入的是一个有序的数组, 左右递减, 取中间下标进行匹配, 如果中值小于目标值, 右下标向左移动一位, 小于则左下标等于中下标, 缩小搜索边界

```js
const binarySearchRightBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1

  while(left <= right) {
    const mid = left + ((right - left) >> 1)
    if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] === target) {
      left = mid + 1
    }
  }

  return nums[right] === target ? right : -1
}

// ---------- Test ----------
const nums = [1,2,3,4,5,6,6,6,6,6,6,7]
const target = 6

console.log(binarySearchRightBound(nums, target))
// 10
```
