import CustomSvgSprite from './CustomSvgSprite.vue'

export default ({ Vue }) => {
  console.log(CustomSvgSprite, '-- CustomSvgSprite');
  // eslint-disable-next-line vue/match-component-file-name
  Vue.component('CustomSvgSprite', CustomSvgSprite)
}