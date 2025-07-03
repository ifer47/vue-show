declare module 'vue' {
  export interface GlobalComponents {
    IfSkeleton: (typeof import('./components/if-skeleton/index.vue'))['default']
    IfInput: (typeof import('./components/if-input/index.vue'))['default'] &
      (typeof import('element-plus'))['ElInput']
  }
}
export {}
