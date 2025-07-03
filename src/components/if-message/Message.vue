<template>
  <transition name="down" @after-leave="close">
    <div v-show="visible" class="msg-wrapper">{{ message }}</div>
  </transition>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const {
  timeout = 3000,
  close,
  message = '提示信息',
} = defineProps<{
  timeout: number
  close: () => void
  message?: string
}>()

const visible = ref(false)
let timer: number | null = null

onMounted(() => {
  visible.value = true
  timer = setTimeout(() => {
    visible.value = false
  }, timeout)
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})
</script>

<style scoped>
.msg-wrapper {
  position: absolute;
  padding: 6px 20px;
  left: 50%;
  top: 15%;
  transform: translate(-50%, 0);
  text-align: center;
  color: #333;
  background-color: rgba(61, 216, 195, 0.8);
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  font-family: cursive;
}

.down-enter-active,
.down-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
