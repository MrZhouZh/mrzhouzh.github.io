---
title: 算法-两数之和
date: 2023-03-02
category: Algo
---

## 两数之和

> 来源: [https://leetcode.cn/problems/two-sum/](https://leetcode.cn/problems/two-sum/)


给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

解题思路:

**关键点在于交换律思路**

::: details 点击查看代码

<<< @/docs/_code/Algo/twoNum.js#snippet{21,23,25}

:::

### TS 版本

::: details 点击查看代码

```ts
const twoSumFunc = (
  nums: number[],
  target: number,
): boolean => {
  // if (nums.length === 0) return false
  // const dict = Object.fromEntries(nums.map(n => [n, true]))
  // return nums.some(n => dict[target - n])

  // 2. 不考虑性能, 直接 some
  return nums.some(n => nums.includes(target - n))
}

const twoSum = (
  nums: number[],
  target: number,
  set: Set<number> = new Set([])
): boolean => {
  if (nums.length === 0) return false
  const delta = target - nums[0]
  return set.has(delta) ? true : twoSum(nums.slice(1), target, new Set([...set, nums[0]]))
}

type ToTuple<L extends number, T extends any[] = []> =
  T extends { length: L } ? T : ToTuple<L, [...T, any]>

type Sub<A extends number, B extends number> =
  ToTuple<A> extends [...ToTuple<B>, ...infer Tail] ? Tail['length'] : -1
type Tail<T> = T extends [any, ...infer Tail] ? Tail : []

type TTwoSum<N extends number[], T extends number, Set extends any = []> =
  N['length'] extends 0
    ? never
    : Set extends Sub<T, N[0]>
      ? true
      : TTwoSum<Tail<N>, T, Set | N[0]>

type Expect<T extends true> = T
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) 
    ? true
    : false

type Cases = [
  Expect<Equal<TTwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TTwoSum<[2, 7, 11, 15], 2>, never>>,
]
// [true, true]
```
:::
