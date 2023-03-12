---
title: 算法-二分查找右边界
date: 2023-03-08
category: Algo
---

## 二分查找右边界

> 实现原理: 传入的是一个有序的数组, 左右递减, 取中间下标进行匹配, 如果中值小于目标值, 右下标向左移动一位, 小于则左下标等于中下标, 缩小搜索边界

<<< @/docs/_code/Algo/binarySearchRightBound.js#snippet{11,22,28}
