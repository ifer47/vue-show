import type { App } from 'vue'
import _ from 'underscore'

interface IListItem {
  el: HTMLImageElement
  src: string
}
// 添加了 v-lazy 指令的图片信息，加载后会被添加进 list
let list: IListItem[] = []

const handleImg = (o: IListItem) => {
  // 默认占位图
  o.el.src = 'https://img.yzcdn.cn/vant/cat.jpeg'
  const rect = o.el.getBoundingClientRect()
  // 图片位于视口下方
  const isBottom = rect.top >= window.innerHeight
  // 图片位于视口上方
  const isTop = rect.bottom <= 0
  // 图片在视口内
  if (!isBottom && !isTop) {
    o.el.src = o.src
    // 从 list 中移除
    list = list.filter((item) => item.src !== o.src)
  }
}
const handleImgList = _.debounce(() => {
  console.log(list, 1)
  if (list.length > 0) {
    list.forEach(handleImg)
  } else {
    window.removeEventListener('scroll', handleImgList)
  }
}, 100)

export default function (app: App<Element>) {
  app.directive('lazy', {
    mounted(el, binding) {
      const o = {
        el, // DOM
        src: binding.value, // 图片地址
      }
      list.push(o)
      handleImg(o)

      window.addEventListener('scroll', handleImgList)
    },
    unmounted(el) {
      window.removeEventListener('scroll', handleImgList)
      list = list.filter((item) => item.el !== el)
    },
  })
}
