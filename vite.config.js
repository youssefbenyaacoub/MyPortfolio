import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei"],
          "vendor-motion": ["motion/react", "framer-motion"],
          "vendor-utils": ["tailwind-merge"],
        },
      },
    },
    reportCompressedSize: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
