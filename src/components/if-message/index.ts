import { h, render } from 'vue'
import Message from './Message.vue'

export const onMessage = (message?: string, timeout?: number) => {
  const _timeout = timeout || 3000
  const _message = message || '提示信息'

  // 创建专门的容器div
  const container = document.createElement('div')
  document.body.appendChild(container)

  const close = () => {
    // 清除这个特定容器中的内容
    render(null, container)
    // 从DOM中移除容器
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  }

  // #1 利用 h 函数创建虚拟节点
  const renderDom = h(Message, {
    timeout: _timeout,
    message: _message,
    close,
  })
  // #2 渲染虚拟节点到专门的容器
  render(renderDom, container)
}
