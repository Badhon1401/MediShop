import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'src/app', // <-- set this to the folder containing your HTML file
  plugins: [react()],
  server: {
    port: 3000, // Change to your desired port
  },
})
