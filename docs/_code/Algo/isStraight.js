/**
 * 剑指 Offer 61. 扑克牌中的顺子
 * 原理: 最大最小值之间差值小于5
 * @param {number} nums 长度为5的数组
 * @returns {boolean}
 */
const isStraight = (nums) => {
  let set = new Set(), max = 0, min = 14
  for (const n of nums) {
    // 跳过大小王
    if (n === 0) continue
    max = Math.max(n, max)
    min = Math.min(n, min)
    // 如果存在相同的, 则表示不是顺子
    if(set.has(n)) return false
    set.add(n)
  }
  // 最大最小值之间差值小于5
  return max - min < 5
}

// test
console.log(isStraight([1,2,3,4,5]))  // true
console.log(isStraight([0,0,1,2,5]))  // true
console.log(isStraight([11,0,9,10,0]))  // true
console.log(isStraight([0,6,7,10,11]))  // false
