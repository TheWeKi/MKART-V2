import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,

        proxy: {
            '/api': {
                target: 'http://mkartv2.com',
                changeOrigin: true,
                secure: false,
              },
        }
    },
    plugins: [react()],
})
