# 1. 问题

```html
<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'

  const move = () => {
    console.log('move')
  }

  onMounted(() => {
    addEventListener('mousemove', move)
  })

  onUnmounted(() => {
    removeEventListener('mousemove', move)
  })
</script>
```

# 2. 基础封装

src\hooks\useEventListener.ts

```ts
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { onMounted, onUnmounted } from 'vue'

// @ts-expect-error
export const useEventListener = (type, callback, options?: AddEventListenerOptions) => {
  onMounted(() => {
    addEventListener(type, callback, options || false)
  })

  onUnmounted(() => {
    removeEventListener(type, callback, options || false)
  })
}
```

App.vue

```html
<script setup lang="ts">
  import { useEventListener } from './hooks/useEventListener'

  const move = () => {
    console.log('move')
  }

  useEventListener('mousemove', move)
</script>
```

# 3. 有可能绑到了 div 上面

```ts
import { onMounted, onUnmounted, unref, type MaybeRef } from 'vue'

export const useEventListener = (
  ele: MaybeRef<HTMLElement | null>,
  type: string,
  callback: EventListener,
  options?: AddEventListenerOptions,
) => {
  onMounted(() => {
    unref(ele)?.addEventListener(type, callback, options || false)
  })

  onUnmounted(() => {
    unref(ele)?.removeEventListener(type, callback, options || false)
  })
}
```

测试，App.vue

```html
<template>
  <div class="box" ref="box"></div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useEventListener } from './hooks/useEventListener'

const oBox = useTemplateRef('box')
const move = (e: Event) => {
  const mouseEvent = e as MouseEvent
  console.log(mouseEvent.clientX, mouseEvent.clientY)
}
useEventListener(oBox, 'mousemove', move)
</script>

<style scoped>
.box {
  width: 300px;
  height: 300px;
  background-color: teal;
}
</style>
```

# 4. 如果一个元素销毁了，就解绑此元素身上的事件监听

特点：元素销毁，最终此元素会变成 null，验证：

```js
setTimeout(() => {
  visibile.value = false
  nextTick().then(() => {
    console.log(oBox.value)
  })
}, 2000)
```

所以可以通过监听 DOM 的变化做一些处理：

```ts
import { onUnmounted, unref, watch, type MaybeRef } from 'vue'

export const useEventListener = (
  ele: MaybeRef<HTMLElement | null>,
  type: string,
  callback: EventListener,
  options?: AddEventListenerOptions,
) => {
  let rmEvent = () => {}
  // 首页触发 watch => unref(ele) 的值是 null => 获取到元素（onMounted）
  // 最后触发 watch => unref(ele) 的值是 DOM 元素 => null
  watch(
    () => unref(ele),
    (el) => {
      rmEvent()
      if (!el) return
      el?.addEventListener(type, callback, options || false)
      rmEvent = () => el?.removeEventListener(type, callback, options || false)
    },
  )
  onUnmounted(() => {
    rmEvent()
  })
}
```

App.vue

```html
<template>
  <div class="box" ref="box" v-if="visibile"></div>
</template>

<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import { useEventListener } from './hooks/useEventListener'

const visibile = ref(true)

setTimeout(() => {
  visibile.value = false
  nextTick().then(() => {
    console.log(oBox.value)
  })
}, 5000)

const oBox = useTemplateRef('box')
const move = (e: Event) => {
  const mouseEvent = e as MouseEvent
  console.log(mouseEvent.clientX, mouseEvent.clientY)
}
useEventListener(oBox, 'mousemove', move)
</script>

<style scoped>
.box {
  width: 300px;
  height: 300px;
  background-color: teal;
}
</style>
```

# 5. 返回一个函数，让外界随时可以解绑



返回一个函数，让外界随时解绑事件

```ts
import { onUnmounted, unref, watch, type MaybeRef } from 'vue'

export const useEventListener = (
  ele: MaybeRef<HTMLElement | null>,
  type: string,
  callback: EventListener,
  options?: AddEventListenerOptions,
) => {
  let rmEvent = () => {}
  // 首页触发 watch => unref(ele) 的值是 null => 获取到元素（onMounted）
  // 最后触发 watch => unref(ele) 的值是 DOM 元素 => null
  watch(
    () => unref(ele),
    (el) => {
      rmEvent()
      if (!el) return
      el?.addEventListener(type, callback, options || false)
      rmEvent = () => el?.removeEventListener(type, callback, options || false)
    },
  )
  onUnmounted(() => {
    rmEvent()
  })
  return () => {
    rmEvent()
  }
}

```

App.vue

```html
<template>
  <div class="box" ref="box" v-if="visibile"></div>
  <button @click="removeBoxEvent">解绑</button>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useEventListener } from './hooks/useEventListener'

const visibile = ref(true)

const oBox = useTemplateRef('box')
const move = (e: Event) => {
  const mouseEvent = e as MouseEvent
  console.log(mouseEvent.clientX, mouseEvent.clientY)
}
const rmEvent = useEventListener(oBox, 'mousemove', move)

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
```

# 6. off 调用的时候 watch 也删掉，避免内存泄漏

至于组件卸载的时候，watch 会自动干掉的。

```ts
import { onUnmounted, unref, watch, type MaybeRef } from 'vue'

export const useEventListener = (
  ele: MaybeRef<HTMLElement | null>,
  type: string,
  callback: EventListener,
  options?: AddEventListenerOptions,
) => {
  let rmEvent = () => {}
  // 首页触发 watch => unref(ele) 的值是 null => 获取到元素（onMounted）
  // 最后触发 watch => unref(ele) 的值是 DOM 元素 => null
  const unWatch = watch(
    () => unref(ele),
    (el) => {
      rmEvent()
      if (!el) return
      el?.addEventListener(type, callback, options || false)
      rmEvent = () => el?.removeEventListener(type, callback, options || false)
    },
  )
  onUnmounted(() => {
    rmEvent()
  })
  return () => {
    rmEvent()
    unWatch()
  }
}

```

# 7. 期望 hook 不仅仅在组件可以使用

onScopeDispose，当前副作用函数的作用域销毁的时候移除

```ts
import { onScopeDispose } from 'vue'
import { unref, watch, type MaybeRef } from 'vue'

export const useEventListener = (
  ele: MaybeRef<HTMLElement | null>,
  type: string,
  callback: EventListener,
  options?: AddEventListenerOptions,
) => {
  let rmEvent = () => {}
  // 首页触发 watch => unref(ele) 的值是 null => 获取到元素（onMounted）
  // 最后触发 watch => unref(ele) 的值是 DOM 元素 => null
  const unWatch = watch(
    () => unref(ele),
    (el) => {
      console.log('watch')
      rmEvent()
      if (!el) return
      el?.addEventListener(type, callback, options || false)
      rmEvent = () => el?.removeEventListener(type, callback, options || false)
    },
  )
  onScopeDispose(() => {
    rmEvent()
  })
  return () => {
    rmEvent()
    unWatch()
  }
}

```

测试，App.vue

```html
<template>
  <div class="box" ref="box" v-if="visibile"></div>
  <button @click="removeBoxEvent">解绑</button>
  <button @click="visibile = !visibile">显示隐藏</button>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useEventListener } from './hooks/useEventListener'

const visibile = ref(true)

const oBox = useTemplateRef('box')
const move = (e: Event) => {
  const mouseEvent = e as MouseEvent
  console.log(mouseEvent.clientX, mouseEvent.clientY)
}
const rmEvent = useEventListener(oBox, 'click', move)

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
```

