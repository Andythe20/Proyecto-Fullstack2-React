import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  assetsInclude: ["**/*.ttf"],

  // PROXY PARA QUE FETCH FUNCIONE EN LOCAL
  server: {
    proxy: {
      "/api/v1": {
        //target: "http://34.204.118.73",
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/auth": {
        //target: "http://34.204.118.73",
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});