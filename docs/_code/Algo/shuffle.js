/**
 * 洗牌算法
 * Fisher–Yates shuffle
 * see: https://www.cnblogs.com/macq/p/6650586.html
 * @param {any[]} arr 
 * @returns {any[]}
 */
const shuffle = (arr) => {
  let copyList = arr.splice(0);
  let i = copyList.length, j;

  while (--i) {
    j = Math.floor(Math.random() * i);
    [copyList[j], copyList[i]] = [copyList[i], copyList[j]];
  }

  return copyList;
}

const arr = Array.from({ length : 4 }, (_, index) => ({
  id: index,
  number: index % 2 + 1
}))

console.log(shuffle(arr))

// [
//   {
//     id: 3,
//     number: 2,
//   },
//   {
//     id: 2,
//     number: 1,
//   },
//   {
//     id: 0,
//     number: 1,
//   },
//   {
//     id: 1,
//     number: 2,
//   },
// ]
