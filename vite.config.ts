import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
// import VueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Component from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VueDevTools(),
    vuetify(),
    svgLoader({ defaultImport: 'component' }),
    AutoImport({
      dts: true,
      imports: [
        {
          from: 'vue',
          imports: [
            'ref',
            'reactive',
            'shallowRef',
            'shallowReactive',
            'computed',
            'watch',
            'watchEffect',
            'onMounted',
            'onUnmounted',
            'onBeforeUnmount',
            'onBeforeMount',
            'onUpdated',
            'onBeforeUpdate',
            'nextTick'
          ]
        },
        'vue-router',
        'vue-i18n',
        { from: 'pinia', imports: ['defineStore', 'storeToRefs'] },
        { from: 'vee-validate', imports: ['useField', 'useForm', 'useFieldArray'] }
      ]
    }),
    Component({
      dts: true,
      globs: ['./src/components/base/**/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  },
  envPrefix: 'VUE_'
});
