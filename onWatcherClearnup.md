```html
<template>
  <button @click="flag = !flag">change flag</button>
</template>

<script lang="ts" setup>
  import { onWatcherCleanup, watchEffect, ref } from 'vue'

  const flag = ref(true)
  watchEffect(() => {
    console.log('watchEffect')
    if (flag.value) {
      const timer = setInterval(() => {
        console.log('Hello')
      }, 1000)
      onWatcherCleanup(() => {
        console.log('onWatcherCleanup')
        clearInterval(timer)
      })
    }
  })
</script>
```
