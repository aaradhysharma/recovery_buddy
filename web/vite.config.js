import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      // Stub optional TensorFlow backends that aren't needed for web
      '@tensorflow/tfjs-backend-webgpu': '/src/stubs/tfjs-stub.js',
      '@tensorflow/tfjs-backend-wasm': '/src/stubs/tfjs-stub.js',
      '@tensorflow/tfjs-backend-cpu': '/src/stubs/tfjs-stub.js',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: false,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'tensorflow': ['@tensorflow/tfjs', '@tensorflow/tfjs-core', '@tensorflow/tfjs-backend-webgl', '@tensorflow-models/pose-detection'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['@tensorflow/tfjs', '@tensorflow/tfjs-core', '@tensorflow/tfjs-backend-webgl', '@tensorflow-models/pose-detection'],
  },
});

