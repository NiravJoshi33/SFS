import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  server: { host: "0.0.0.0", port: 8000 },
  clearScreen: false,
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
  },
});
