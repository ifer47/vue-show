<script setup lang="ts">
import { ref } from 'vue'
import type { IfInputInstance } from './components/if-input/index.vue'

const inputValue = ref('')
const onClear = () => {
  console.log('clear')
}

const ifInput = ref<IfInputInstance>()
</script>

<template>
  <IfInput
    :style="{ width: '300px' }"
    ref="ifInput"
    v-model="inputValue"
    clearable
    @clear="onClear"
    shadow
  >
    <template #title>
      <h2>训练营</h2>
    </template>
    <template #append>
      <el-button>梦想金山</el-button>
    </template>
  </IfInput>
</template>
