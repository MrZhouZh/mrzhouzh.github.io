/**
 * 二分查找右边界
 * @param {number[]} nums 
 * @param {number} target 
 * @returns number
 */
const binarySearchRightBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1

  while(left <= right) {
    // const mid = left + ((right - left) >> 1)
    // if (nums[mid] < target) {
    //   left = mid + 1
    // } else if (nums[mid] > target) {
    //   right = mid - 1
    // } else if (nums[mid] === target) {
    //   left = mid + 1
    // }
    // --- TODO: Test case ---
    // mid = left + Math.floor((right - left) / 2)
    const mid = left + ((right - left) >> 1)
    if (nums[mid] > target) {
      right = mid - 1
    } else {
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
