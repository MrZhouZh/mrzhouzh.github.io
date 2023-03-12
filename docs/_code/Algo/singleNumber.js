/**
 * 统计只出现一次的数字
 * @param {number[]} nums 
 * @returns number
 */
const singleNumber = (nums) => {
  let res = 0
  for(const n of nums) {
    res ^= n
  }

  return res
}

// ---------- Test ----------
console.log(singleNumber([4,1,2,3,1,2,3]))
// 4
