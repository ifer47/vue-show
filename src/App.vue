<template>
  <!-- 这儿使用了 Suspense，所以在子组件加载完成之前，也就是从服务端拿到数据之前，都不会去渲染子组件（相当于“暂停”渲染子组件） -->
  <!-- 而是去渲染 #fallback 插槽中的 loading，等到从服务端拿到数据之后异步子组件才算是加载完成了，此时才会第一次去渲染子组件，并且将 loading 替换为子组件 -->
  <Suspense>
    <AsyncUser />
    <template #fallback>loading...</template>
  </Suspense>
</template>

<script setup lang="ts">
import AsyncUser from './components/user/index.vue'
</script>
