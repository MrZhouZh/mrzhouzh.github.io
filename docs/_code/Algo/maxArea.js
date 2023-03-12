/**
 * 盛最多水的容器
 * @param {number[]} data 
 * @returns number
 * 
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */
const maxArea = (data) => {
  // 双指针
  // for
  // let max = 0;
  // for (let i = 0, j = data.length - 1; i < j; ) {
  //     const minHeight = data[i] < data[j] ? data[i++] : data[j--];
  //     const area = (j - i + 1) * minHeight;
  //     console.log(`i = ${i}, j = ${j}. minHeight = ${minHeight}. area: ${area} 
  //     (${j}-${i}+1)*${minHeight}`);
  //     max = Math.max(max, area);
  // }

  // while
  let i = 0, j = data.length -1, max = 0
  while(i < j) {
      max = Math.max(max, Math.min(data[i], data[j]) * (j - i))
      if (data[i] < data[j]) {
          i++
      } else {
          j--
      }
  }
  return max;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
// 49
