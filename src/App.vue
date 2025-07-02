<script setup lang="ts">
import { ref } from 'vue'
const arr = ref<string[]>([])
setTimeout(() => {
  arr.value = ['赵云', '吕布', '张飞']
}, 30000)
</script>

<template>
  <ul class="list" v-if="arr.length">
    <li v-for="item in arr" :key="item">{{ item }}</li>
  </ul>
  <IfSkeleton v-else display="block" animated fade />
</template>

<style scoped>
.list li {
  height: 30px;
  background-color: pink;
  margin-bottom: 10px;
}
</style>
