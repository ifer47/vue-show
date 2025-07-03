<script setup lang="ts">
import { IfInput } from '../components'
import { ref } from 'vue'

const inputValue = ref('')

const handleInput = (value: string | number) => {
  console.log('输入值:', value)
}

const handleFocus = (event: FocusEvent) => {
  console.log('获取焦点:', event)
}

const handleBlur = (event: FocusEvent) => {
  console.log('失去焦点:', event)
}
</script>

<template>
  <main>
    <div style="padding: 20px;">
      <h2>IfInput 组件类型提示测试</h2>

      <div style="margin-bottom: 20px;">
        <h3>基础输入框</h3>
        <IfInput
          v-model="inputValue"
          placeholder="请输入内容"
          clearable
          size="large"
          type="text"
          maxlength="100"
          show-word-limit
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          style="width: 300px;"
        />
      </div>

      <div style="margin-bottom: 20px;">
        <h3>密码输入框</h3>
        <IfInput
          placeholder="请输入密码"
          type="password"
          show-password
          size="default"
          style="width: 300px;"
        />
      </div>

      <div style="margin-bottom: 20px;">
        <h3>禁用状态</h3>
        <IfInput
          placeholder="禁用输入框"
          disabled
          value="禁用的值"
          style="width: 300px;"
        />
      </div>

      <div style="margin-bottom: 20px;">
        <h3>只读状态</h3>
        <IfInput
          readonly
          value="只读的值"
          style="width: 300px;"
        />
      </div>

      <div>当前输入值: {{ inputValue }}</div>
    </div>
  </main>
</template>
