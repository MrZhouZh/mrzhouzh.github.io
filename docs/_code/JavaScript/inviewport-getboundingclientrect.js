/**
 * 判断元素是否在可视区域内 (getBoundingClientRect) 
 * 如果一个元素在视窗之内的话，那么它一定满足下面四个条件：
 * - top 大于等于 
 * - left 大于等于 
 * - bottom 小于等于视窗高
 * - right 小于等于视窗宽度
 * 
 * @param {HTMLElement} element 
 * @returns {boolean}
 */
function inViewport(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  const viewHeight = window.innerHeight || document.documentElement.clientHeight

  const {
    top, right, bottom, left, 
  } = element.getBoundingClientRect()

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  )
}
