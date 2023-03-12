---
title: 算法-盛最多水的容器
date: 2023-03-12
category: Algo
---

## 盛最多水的容器

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。

::: tip
**说明：你不能倾斜容器。**
:::

> 来源: [https://leetcode.cn/problems/container-with-most-water/](https://leetcode.cn/problems/container-with-most-water/)

解题思路:

双指针求解, 根据面积公式: **`S(i,j)=min(h[i],h[j])×(j−i)`**, 不断计算面积, 最后得到最大面积

<<< @/docs/_code/Algo/maxArea.js#snippet{21}
