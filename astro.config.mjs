import { defineConfig } from 'astro/config';

export default defineConfig({
  srcDir: './src',
  outDir: './dist',
  publicDir: './public',
  
  build: {
    format: 'directory'
  },

  server: {
    port: 3000,
    host: true
  }
}); 