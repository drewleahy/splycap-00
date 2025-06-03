
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react'],
          'router-vendor': ['react-router-dom'],
        },
      },
      external: (id) => {
        // Handle dynamic imports gracefully
        if (id.includes('jspdf') && mode === 'production') {
          return false;
        }
        return false;
      },
    },
  },
  plugins: [
    react(),
    // Disabled the component tagger to remove the Lovable badge
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['jspdf'],
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
