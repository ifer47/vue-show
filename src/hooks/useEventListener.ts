import { onScopeDispose } from 'vue'
import { unref, watch, type MaybeRef } from 'vue'

export const useEventListener = (
  ele: MaybeRef<HTMLElement | null>,
  type: string,
  callback: EventListener,
  options?: AddEventListenerOptions,
) => {
  let rmEvent = () => {}
  // 首页触发 watch => unref(ele) 的值是 null => 获取到元素（onMounted）
  // 最后触发 watch => unref(ele) 的值是 DOM 元素 => null
  const unWatch = watch(
    () => unref(ele),
    (el) => {
      console.log('watch')
      rmEvent()
      if (!el) return
      el?.addEventListener(type, callback, options || false)
      rmEvent = () => el?.removeEventListener(type, callback, options || false)
    },
  )
  onScopeDispose(() => {
    console.log(1)
    rmEvent()
  })
  return () => {
    rmEvent()
    unWatch()
  }
}
