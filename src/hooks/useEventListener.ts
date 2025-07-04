import { watch, unref, type MaybeRef, onScopeDispose } from 'vue'
export const useEventListener = (
  ele: MaybeRef<HTMLElement | null>,
  type: string,
  callback: EventListener,
  options?: AddEventListenerOptions,
) => {
  // 首页触发 watch => unref(ele) 的值是 null => 获取到元素（onMounted）
  // 最后触发 watch => unref(ele) 的值是 DOM 元素 => null
  let rmEvent = () => {}
  const unWatch = watch(
    () => unref(ele),
    (el) => {
      rmEvent()
      if (!el) return
      el?.addEventListener(type, callback, options || false)
      rmEvent = () => el?.removeEventListener(type, callback, options || false)
    },
  )
  onScopeDispose(() => {
    rmEvent()
  })
  return () => {
    rmEvent()
    unWatch()
  }
}
