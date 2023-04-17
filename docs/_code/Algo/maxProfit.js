/**
 * 买卖股票的最大利润
 * 
 * @param {number[]} prices 股票每天的单价
 * @returns {number}
 */
const maxProfit = (prices) => {
  // 暴力解
  // 时间复杂度: O(n^2)
  // 空间复杂度: O(1)
  // if (prices.length === 0) return 0;
  // let _maxprofit = 0,
  //   len = prices.length,
  //   profit;

  // for (let i = 1; i < len; i++) {
  //   for (let j = i + 1; j < len - 1; j++) {
  //     profit = prices[j] - prices[i];
  //     if (profit > _maxprofit) {
  //       _maxprofit = profit
  //     }
  //   }
  // }

  // return _maxprofit;

  // 贪心
  // 时间复杂度: O(n)
  // 空间复杂度: O(1)
  // let min = prices[0],
  //   max = 0
  // for (const price of prices) {
  //   min = Math.min(min, price)
  //   max = Math.max(max, price - min)
  // }

  // return max

  // 动态规划 1
  // 时间复杂度: O(n)
  // 空间复杂度: O(n)
  // let len = prices.length,
  //   dp = new Array(len).fill(Array(2))
  
  // dp[0][0] = 0
  // dp[0][1] = -prices[0]

  // for (let i = 1; i < len; i++) {
  //   // 这里不能用dp[i - 1][0] - prices[i], 因为这样会超时, 下面的dp[i][1] = Math.max(dp[i - 1][1], -prices[i])就会超时.
  //   dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
  //   dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
  // }
  
  // return dp[len - 1][0]

  // 动态规划 2
  // 时间复杂度: O(n)
  // 空间复杂度: O(1)
  // 动态规划三步走:
  // 1. 数组元素的含义: dp[i] 表示第i天的最大利润, dp[0] 表示第i天不持有股祶的最大利润, dp[1] 表示第i天持有股祶的最大利润
  // 2. 状态转移方程: dp[0] = max(dp[0], dp[1] + prices[i]), dp[1] = max(dp[1], -prices[i])
  // 3. 初始值: dp[0] = 0, dp[1] = -prices[0]
  let len = prices.length,
    dp = new Array(2)

  // dp: [0, -7]
  // dp: [0, -1]
  // dp: [4, -1]
  // dp: [4, -1]
  // dp: [5, -1]

  dp[0] = 0
  dp[1] = -prices[0]

  for (let i = 1; i < len; i++) {
    console.log(dp);
    dp[0] = Math.max(dp[0], dp[1] + prices[i])
    dp[1] = Math.max(dp[1], -prices[i])
  }
  
  return dp[0]
}

// test
console.log(maxProfit([7, 1, 5, 3, 6, 4])) // 5
console.log(maxProfit([7, 6, 4, 3, 1])) // 0
console.log(maxProfit([1, 2, 3, 6, 9, 1]))

// 动态规划看这篇就够了: https://blog.csdn.net/weixin_43786756/article/details/115346883
