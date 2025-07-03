import IfSkeleton from './if-skeleton/index.vue'
import IfInput from './if-input/index.vue'
import { type App } from 'vue'
export default {
  install(app: App) {
    app.component(IfSkeleton.name!, IfSkeleton)
    app.component(IfInput.name!, IfInput)
  },
}
