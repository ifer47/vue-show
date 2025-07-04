```html
<template>
  <h2>effectScope、getCurrentScope、onScopeDispose</h2>
  <div>
    <div>count: {{ count }}</div>
    <button @click="add">add</button>
    <button @click="stop">stop</button>
  </div>
</template>

<script setup lang="ts">
  // https://github.com/vuejs/core/issues/11886
  import {
    effectScope,
    getCurrentScope,
    watch,
    watchEffect,
    ref,
    computed,
    onScopeDispose,
  } from 'vue'

  const scope = effectScope()
  const allScope = getCurrentScope()
  const count = ref(0)
  const add = () => {
    count.value++
  }
  scope.run(() => {
    const newCount = computed(() => count.value * 2)
    watch(newCount, () => {
      console.log('watch', newCount.value)
    })
    watchEffect(() => {
      console.log('watchEffect', newCount.value)
    })
    onScopeDispose(() => {
      console.log('onScopeDispose2')
    })
  })
  onScopeDispose(() => {
    console.log('onScopeDispose1')
  })
  // 关闭监听器和计算属性
  const stop = () => {
    // 处理掉当前作用域内所有的 effect
    scope?.stop()
    // allScope?.stop()
  }
  // effectScope: 创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。
  // getCurrentScope: 如果有的话，返回当前活跃的 effect 作用域。
  // onScopeDispose: 在当前活跃的 effect 作用域上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。
</script>
```
