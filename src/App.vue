<template>
  <div class="box" ref="box" v-if="visibile"></div>
  <button @click="removeBoxEvent">解绑</button>
  <button @click="visibile = !visibile">显示隐藏</button>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useTest } from './hooks/useTest'

const visibile = ref(true)

const oBox = useTemplateRef('box')
const move = (e: Event) => {
  const mouseEvent = e as MouseEvent
  console.log(mouseEvent.clientX, mouseEvent.clientY)
}
const rmEvent = useTest(oBox, 'click', move)

const removeBoxEvent = () => {
  rmEvent()
}
</script>

<style scoped>
.box {
  width: 300px;
  height: 300px;
  background-color: teal;
}
</style>
