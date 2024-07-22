import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/fonts/*',
          dest: 'assets/fonts'
        },
        {
          src: 'src/assets/images/*',
          dest: 'assets/images'
        },
        {
          src: 'src/assets/svg/*',
          dest: 'assets/svg'
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
      },
    },
  },
});
