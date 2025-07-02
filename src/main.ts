import { createApp } from 'vue'
import IfUI from './components/index'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(IfUI)
app.mount('#app')
