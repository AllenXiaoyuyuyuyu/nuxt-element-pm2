import { defineNuxtConfig } from "nuxt/config";
import viteCompression from "vite-plugin-compression";
const lifecycle = process.env.npm_lifecycle_event;

export default defineNuxtConfig({
  app: {
    head: {
      meta: [],
      link: [],
      script: [],
    },
  },
  // build
  build: {
    transpile:
      (lifecycle && lifecycle.indexOf("build") >= 0) || lifecycle === "generate"
        ? ["element-plus"]
        : [],
  },
  typescript: {
    strict: true,
    shim: false,
  },
  components: true,
  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  vite: {
    plugins: [
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ``, // 添加公共样式
        },
      },
    },
    build: {
      commonjsOptions: {
        ignoreTryCatch: false,
      },
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // console.log(id)
            if (id.includes("node_modules")) {
              return "vendor";
            }
            ["element-plus"]; //分片
          },
          inlineDynamicImports: false,
        },
      },
    },
  },
});
