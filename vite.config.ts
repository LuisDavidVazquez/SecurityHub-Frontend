import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/fonts/*', // Copia solo el contenido de la carpeta
          dest: 'assets/fonts'       // Destino correcto
        },
        {
          src: 'src/assets/images/*', // Copia solo el contenido de la carpeta
          dest: 'assets/images'       // Destino correcto
        },
        {
          src: 'src/assets/svg/*', // Copia solo el contenido de la carpeta
          dest: 'assets/svg'       // Destino correcto
        }
      ]
    })
  ]
});
