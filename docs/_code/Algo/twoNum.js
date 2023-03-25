/**
 * 两数之和
 * @param {number[]} nums 
 * @param {number} target 
 * @returns number[]
 * 
 * 双循环
 * 时间复杂度 O(n**2)
 * 空间复杂度 O(1)
 * 
 * map映射
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
const twoNum = (nums, target) => {
  // 暴力解, 双循环
  // for (let i = 0, len = nums.length; i < len; i++) {
  //   for (let j = i + 1; j < len; j++) {
  //     if (nums[i] + nums[j] === target) {
  //       return [i, j]
  //     }
  //   }
  // }
  // return []

  // map 映射
  const map = new Map()
  for (let i = 0, len = nums.length; i < len; i++) {
    const x = target - nums[i]
    if (map.has(x)) {
      return [map.get(x), i]
    }
    map.set(nums[i], i)
  }
  return []
}

const twoSum2 = (nums, target) => {
  // if (nums.length === 0) return false
  // const dict = Object.fromEntries(nums.map(n => [n, true]))
  // return nums.some(n => dict[target - n])

  // 2. 不考虑性能, 直接 some
  return nums.some(n => nums.includes(target - n))
}

console.log(twoNum([3,2,4], 6))
console.log(twoSum2([1, 1], 2))
// [1,2]
