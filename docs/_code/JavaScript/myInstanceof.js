/**
 * 实现 instanceof
 */
function myInstanceof(L, R) {
  if (L === null && typeof L !== 'object') return false

  let LProto = L.__proto__
  while(true) {
    if (LProto === R.prototype) return true
    LProto = LProto.__proto__
  }

}

let arr = [1, 2]
let obj = { a: 1 }
let symbl = Symbol('foo')

console.log(arr instanceof Array) // true
console.log(obj instanceof Object)  // true

console.log(myInstanceof(arr, Array)) // true
console.log(myInstanceof(obj, Object))  // true
