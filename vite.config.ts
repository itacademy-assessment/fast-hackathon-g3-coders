import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist",
        assetsDir: "assets",
        sourcemap: false,
        emptyOutDir: true,
    },
    publicDir: "public",
    server: {
        port: 5173,
        open: true,
    },
});
