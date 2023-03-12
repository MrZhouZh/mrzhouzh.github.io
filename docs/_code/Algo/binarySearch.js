/**
 * 二分查找
 * @param {number[]} nums 
 * @param {number} target 
 * @returns number
 */
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
