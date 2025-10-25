import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Make sure to import path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // --- ADD THIS BLOCK ---
  server: {
    proxy: {
      // Any request starting with /api will be forwarded
      "/api": {
        target: "http://localhost:3001", // Your backend server URL
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Can be false if you're not using HTTPS
      },
    },
  },
  // ---------------------
});
