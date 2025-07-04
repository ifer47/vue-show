import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import IfUI from './components/index'
import { createPinia } from 'pinia'
import lazy from './directives/lazy'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(IfUI)
app.use(lazy)
app.mount('#app')
