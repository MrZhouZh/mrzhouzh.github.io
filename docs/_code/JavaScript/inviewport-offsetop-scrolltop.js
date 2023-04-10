/**
 * 判断元素是否在可视区域内(offsetTop scrollTop)
 * 不太准确, 受布局的影响会导致判断偏差
 * 公式: el.offsetTop - document.documentElement.scrollTop <= viewPortHeight
 * @param {HTMLElement} element 
 */
function inViewport(element) {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const elOffsetTop = element.offsetTop
  const docScrollTop = document.documentElement.scrollTop
  const top = elOffsetTop - docScrollTop
  return top <= viewportHeight
}
