/**
 * 二分查找左边界
 * @param {number[]} nums 
 * @param {number} target 
 * @returns number
 */
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
