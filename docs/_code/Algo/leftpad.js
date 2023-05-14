/**
 * 左补齐字符串
 * @param {string} str 输入字符串
 * @param {number} totalLength 总长度
 * @param {string} char 补齐字符
 */
function leftpad(str, totalLength, char) {
  let len = totalLength - str.length
  let padStr = ''
  while (true) {
    // len & 1
    if (len % 2 === 1) {
      padStr += char
    }

    if (len === 1) {
      return padStr + str
    }

    char += char
    // len >> 1
    len = parseInt(len / 2)
  }
}

// 简易版
function simpleLeftpad(str, totalLength, char) {
  let len = totalLength - str.length + 1
  return Array.from({ length: len }).join(char) + str
}

// console.log(leftpad('hello', 10, 'g'))
// console.log(simpleLeftpad('hello', 10, 'g'))

console.time('simpleLeftpad')
for(let i = 0; i < 10000; i++){
  simpleLeftpad('hello', 1000, 'g')
}
console.timeEnd('simpleLeftpad')

console.time('leftpad')
for(let i = 0; i < 10000; i++){
  leftpad('hello', 1000, 'g')
}
console.timeEnd('leftpad')
