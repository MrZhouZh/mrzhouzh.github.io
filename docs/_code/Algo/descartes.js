/**
 * 笛卡尔积
 * @param {any[]} skuAttrs 
 * @returns any[]
 */
const descartes = (skuAttrs = []) => {
  if (skuAttrs.length < 2) {
    return skuAttrs[0] || []
  }

  return skuAttrs.reduce((total, current) => {
    const res = []
    total.forEach(t => {
      current.forEach(c => {
        const temp = Array.isArray(t) ? [...t] : [t]
        temp.push(c)
        res.push(temp)
      })
    })

    return res
  })
}

// ---------- Test ---------
const colors = ["黑色", "白色"],
  length = ["长款", "短款"],
  material = ["棉质", "涤纶"],
  sizes = ["S", "M", "L"];
  
console.log(descartes([colors, length, material, sizes]))
// [
//   ["黑色","长款","棉质","S"],
//   ["黑色","长款","棉质","M"],
//   ["黑色","长款","棉质","L"],
//   ["黑色","长款","涤纶","S"],
//   ["黑色","长款","涤纶","M"],
//   ["黑色","长款","涤纶","L"],
//   ["黑色","短款","棉质","S"],
//   ["黑色","短款","棉质","M"],
//   ["黑色","短款","棉质","L"],
//   ["黑色","短款","涤纶","S"],
//   ["黑色","短款","涤纶","M"],
//   ["黑色","短款","涤纶","L"],
//   ["白色","长款","棉质","S"],
//   ["白色","长款","棉质","M"],
//   ["白色","长款","棉质","L"],
//   ["白色","长款","涤纶","S"],
//   ["白色","长款","涤纶","M"],
//   ["白色","长款","涤纶","L"],
//   ["白色","短款","棉质","S"],
//   ["白色","短款","棉质","M"],
//   ["白色","短款","棉质","L"],
//   ["白色","短款","涤纶","S"],
//   ["白色","短款","涤纶","M"],
//   ["白色","短款","涤纶","L"]
// ]
