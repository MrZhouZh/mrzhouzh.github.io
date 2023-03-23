/**
 * 找出井字棋的获胜者
 * --------|-------|--------
 * | (0,0) | (0,1) | (0,2) |
 * --------|-------|--------
 * | (1,0) | (1,1) | (1,2) |
 * --------|-------|--------
 * | (2,0) | (2,1) | (2,2) |
 * --------|-------|--------
 * 
 * 获胜路线的坐标
 * [
 *  [0,0], [0,1], [0,2],
 *  [1,0], [1,1], [1,2],
 *  [2,0], [2,1], [2,2],
 *  [0,0], [1,0], [2,0],
 *  [0,1], [1,1], [2,2],
 *  [0,2], [1,2], [2,2],
 *  [0,0], [1,1], [2,2],
 *  [0,2], [1,1], [2,0],
 * ]
 * 
 * @param {*} moves 
 * @returns {string}
 */
const TicTacToe = (moves) => {
  // 获胜线
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let player = 'A';
  // 模拟棋盘
  const playerLines = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => null));
  player = moves.length % 2 === 1 ? 'A' : 'B'
  moves.forEach(([x, y], i) => {
    const role = i % 2 === 0 ? 'A' : 'B'
    // 记录玩家的坐标
    playerLines[x][y] = role
  })
  const lines = playerLines.flat()
  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i]
    if (lines[a] && lines[a] === lines[b] && lines[a] === lines[c])
      return lines[a]
  }
  return moves.length === 9 ? 'Draw' : 'Pending'
}

const Amoves = [[0, 0], [2, 0], [1, 1], [2, 1], [2, 2]]
const Bmoves = [[0, 0], [1, 1], [0, 1], [0, 2], [1, 0], [2, 0]]
const DrawMoves = [[0, 0], [1, 1], [2, 0], [1, 0], [1, 2], [2, 1], [0, 1], [0, 2], [2, 2]]
const PendingMoves = [[0, 0], [1, 1]]
console.log('It will be expected: A', TicTacToe(Amoves)) // 'A'
console.log('It will be expected: B', TicTacToe(Bmoves)) // 'B'
console.log('It will be expected: Draw', TicTacToe(DrawMoves)) // 'Draw'
console.log('It will be expected: Pending', TicTacToe(PendingMoves)) // 'Pending'
