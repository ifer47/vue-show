declare module 'vue' {
  export interface GlobalComponents {
    IfSkeleton: (typeof import('./components/if-skeleton/index.vue'))['default']
  }
}
export {}
