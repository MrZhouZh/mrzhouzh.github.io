/**
 * 判断元素是否在可视区域内(IntersectionObserver)
 * MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
 * @param {HTMLElement} element
 */
function inViewport(element) {
  const observeCallback = (entries) => {
    if(entries[0].isIntersecting) {
      console.log('Yes, in viewport.')
    } else {
      console.log('No, not in viewport.')
    }
  }
  const observer = new IntersectionObserver(observeCallback, { threshold: 1.0 })
  observer.observe(element)
}
