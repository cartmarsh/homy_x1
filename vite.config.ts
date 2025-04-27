import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { splitVendorChunkPlugin } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    cssMinify: 'esbuild',
    minify: 'terser',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group React and related packages
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react/') || id.includes('react-dom')) {
              return 'react-core';
            }
            
            // React router and related
            if (id.includes('react-router') || id.includes('@remix-run')) {
              return 'react-router';
            }

            // Split Three.js into core and extras
            if (id.includes('three/build/three')) {
              return 'three-core';
            }
            if (id.includes('three/examples')) {
              return 'three-examples';
            }
            if (id.includes('@react-three/fiber')) {
              return 'react-three-fiber';
            }
            if (id.includes('@react-three/drei')) {
              return 'react-three-drei';
            }
            
            // Animation libraries
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }

            // Utils and smaller packages
            if (id.includes('@vercel/analytics')) {
              return 'utils-vendor';
            }

            // Split remaining vendors by first letter to avoid huge chunks
            const pkg = id.split('node_modules/').pop()?.split('/')[0] ?? '';
            if (pkg) {
              const firstChar = pkg.charAt(0).toLowerCase();
              if (/[a-z]/.test(firstChar)) {
                return `vendor-${firstChar}`;
              }
              return 'vendor-misc';
            }
            
            return 'vendors';
          }
          
          // Group components by feature with more granular splitting
          if (id.includes('/components/')) {
            if (id.includes('/portfolio/')) {
              // Split portfolio components
              if (id.includes('PortfolioItem')) {
                return 'portfolio-items';
              }
              if (id.includes('RetroHeader')) {
                return 'portfolio-header';
              }
              return 'portfolio-core';
            }

            if (id.includes('/about/')) {
              return 'about';
            }

            if (id.includes('/contact/')) {
              return 'contact';
            }

            if (id.includes('/three/')) {
              // Split Three.js components
              if (id.includes('RetroGrid')) {
                return 'three-grid';
              }
              if (id.includes('GridParticles')) {
                return 'three-particles';
              }
              return 'three-components';
            }

            if (id.includes('/animations/')) {
              // Split animation components
              if (id.includes('Background')) {
                return 'anim-background';
              }
              if (id.includes('Loader')) {
                return 'anim-loader';
              }
              return 'anim-components';
            }
          }
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: true, // Listen on all local IPs
    port: 5173, // Default Vite port
  }
})
