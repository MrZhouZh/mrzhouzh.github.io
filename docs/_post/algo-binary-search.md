---
title: 算法-二分查找
date: 2023-03-06
---

## 二分查找

**只能在升序的数组中使用**

> 实现原理: 左右递减, 取中间下标进行匹配, 如果小于目标值, 左下标向右移动一位, 反之右下标项向左移动一位

```js
const binarySearch = (nums, target) => {
  if (nums.length === 0) return -1

  let left = 0,
    right = nums.length - 1
  
  while(left <= right) {
    let mid = left + ((right - left) >> 1)

    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if(nums[mid] > target) {
      right = mid - 1
    }
  }

  return -1
}

// ---------- Test ---------
const nums = [1, 3, 6, 9, 10, 12, 16]
const target = 12
console.log(binarySearch(nums, target))
// 5
```

