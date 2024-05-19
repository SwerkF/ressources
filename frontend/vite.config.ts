import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// preline

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})