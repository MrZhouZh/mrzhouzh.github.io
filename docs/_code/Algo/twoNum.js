/**
 * 两数之和
 * @param {number[]} nums 
 * @param {number} target 
 * @returns number[]
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

console.log(twoNum([3,2,4], 6))
// [1,2]
