<template>
  <button ref="btn">click</button>
  <button @click="clearEffect">清理副作用</button>
</template>

<script setup lang="ts">
import { effectScope, useTemplateRef } from 'vue'
import { useEventListener } from './hooks/useEventListener'
const oBtn = useTemplateRef('btn')

const handleClick = () => {
  console.log('金山训练营')
}

const scope = effectScope()
scope.run(() => {
  useEventListener(oBtn, 'click', handleClick)
})

const clearEffect = () => {
  // 停止 scope 作用域内所有的 effect，一旦停止，会触发作用域内的 onScopeDispose 回调
  scope.stop()
}
</script>
