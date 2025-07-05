effectScope: 创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。

getCurrentScope: 如果有的话，返回当前活跃的 effect 作用域。

onScopeDispose: 在当前活跃的 effect 作用域上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。

```html
<template>
  <div>count: {{ count }}</div>
  <button @click="increment">increment</button>
  <button @click="stop">stop</button>
</template>

<script setup lang="ts">
  import { effectScope, getCurrentScope, watch, watchEffect, ref, onScopeDispose } from 'vue'

  const scope = effectScope()
  const allScope = getCurrentScope()
  const count = ref(0)
  const increment = () => {
    count.value++
  }
  scope.run(() => {
    watch(count, () => {
      console.log('watch', count.value)
    })
    watchEffect(() => {
      console.log('watchEffect', count.value)
    })
    onScopeDispose(() => {
      console.log('onScopeDispose2')
    })
  })
  onScopeDispose(() => {
    console.log('onScopeDispose1')
  })
  const stop = () => {
    // 处理掉当前作用域内所有的 effect
    scope?.stop()
    // allScope?.stop()
  }
</script>
```
