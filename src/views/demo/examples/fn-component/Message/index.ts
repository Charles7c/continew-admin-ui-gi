import { render, h } from 'vue'
import Message from './Message.vue'
import type { Props } from './type'

const fn = (options: Props) => {
  // 从 body 上移除组件
  const handleDestroy = () => {
    render(null, document.body)
  }

  // 使用 h 函数创建 vnode
  const vnode = h(Message, {
    ...options,
    destroy: handleDestroy
  })
  // 使用 render 函数将 vnode 渲染为真实DOM并挂载到 body 上
  render(vnode, document.body)
}

export default fn
