<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'IfSkeleton',
})

/* withDefaults(
  defineProps<{
    width: string
    height: string
    bg?: string
    fade?: boolean
    animated?: boolean
    display?: string
  }>(),
  {
    fade: false,
    bg: '#f0f2f5',
    animated: false,
    display: 'inline-block'
  }
) */

const {
  fade = false,
  bg = '#e1e1e1',
  animated = false,
  display = 'inline-block',
  height = 20,
  width = 100,
  rows = 4,
} = defineProps<{
  width?: number
  height?: number
  bg?: string
  fade?: boolean
  animated?: boolean
  display?: string
  rows?: number
}>()

const lineHeight = computed(() => height + 'px')
</script>
<template>
  <div
    class="if-skeleton"
    :style="{ width: width + 'px', height: height + 'px', display }"
    :class="{ shan: animated, fade: fade }"
    v-for="item in rows"
    :key="item"
  >
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: bg }"></div>
    <!-- 2 闪效果 if-skeleton 伪元素 --->
    <slot v-if="$slots.default"></slot>
  </div>
</template>

<style scoped lang="less">
.if-skeleton {
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  line-height: v-bind(lineHeight);
  .block {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    z-index: -1;
  }
}
.if-skeleton:not(:last-of-type) {
  margin-bottom: 10px;
}
.if-skeleton:first-child {
  width: 30% !important;
}
.if-skeleton:last-child {
  width: 70% !important;
}
.shan {
  &::after {
    content: '';
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}

.fade {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
