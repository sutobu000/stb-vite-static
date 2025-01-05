import { resolve } from "path"
import { defineConfig } from "vite"
import vitePluginPug from "./plugins/vite-plugin-pug"

import globule from "globule"

const htmlFiles = globule.find('src/**/*.pug', {
  ignore: [
    'src/**/_*.pug'
  ]
});

export default defineConfig({
  root: "src",
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: htmlFiles,
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: (assetInfo) => {
          const {name} = assetInfo
          if (/\.(jpe?g|png|gif|svg)$/.test(name ?? '')) {
            return 'assets/img/[name][extname]';
          }
          if (/\.(woff?2|ttf|otf)$/.test(name ?? '')) {
            return 'assets/fonts/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    },
  },
  css: {
    devSourcemap: true,
  },
  plugins: [vitePluginPug()],
})