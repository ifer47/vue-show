<template>
  <p>渲染次数：{{ renderCount() }}</p>
  <p>账号：{{ user?.username }}</p>
  <p>地址：{{ user?.address }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'

type User = {
  username: string
  address: string
}
const user = ref<User | null>(null)

// 渲染计数器
let count = 0

const renderCount = () => {
  return ++count
}

// 在顶层使用了 await 后此组件就变成了一个异步组件，等到 await fetchUser() 执行完了后，也就是从服务端拿到了数据后，子组件才算是加载完成
user.value = await fetchUser()

async function fetchUser(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: '就业发动机',
        address: '深圳',
      })
    }, 2000)
  })
}
</script>
