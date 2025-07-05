<template>
  <div>count: {{ count }}</div>
  <button @click="count++">increment</button>
  <button @click="stop">stop</button>
</template>

<script setup lang="ts">
import { effectScope, getCurrentScope, watch, watchEffect, ref, onScopeDispose } from 'vue'

const scope = effectScope()
const allScope = getCurrentScope()
const count = ref(0)
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
