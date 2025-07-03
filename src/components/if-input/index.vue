<template>
  <div :class="{ 'if-input': shadow }">
    <div v-if="$slots.title" class="if-input-title">
      <slot name="title"></slot>
    </div>
    <component :is="h(ElInput as Component, { ...$attrs, ref: bindRef }, $slots)" />
  </div>
</template>

<script setup lang="ts">
import { h, type Component } from 'vue'
import { ElInput } from 'element-plus'
import { getCurrentInstance, type ComponentPublicInstance } from 'vue'

defineOptions({
  name: 'IfInput',
  // inheritAttrs: false,
})

type CustomProps = {
  shadow?: boolean
}
withDefaults(defineProps<CustomProps>(), {
  shadow: false,
})

const vm = getCurrentInstance()!

const xxx = () => {
  console.log('xxx')
}
const bindRef = (el: ComponentPublicInstance | Element | null) => {
  // #2
  vm.exposeProxy = vm.exposed = {
    ...el,
    xxx,
  }
}

// #1
type CustomInstance = InstanceType<typeof ElInput> & {
  xxx: () => void
}
export type IfInputInstance = CustomInstance
</script>

<style scoped>
.if-input {
  transition: 0.3s;
}
/* if-input:focus-within 的目的是聚焦时持续保持样式效果 */
.if-input:hover,
.if-input:focus-within {
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
}

.if-input-title {
  text-align: center;
  font-family: cursive;
  color: #333;
}
</style>
