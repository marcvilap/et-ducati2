import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	//base:"",
	devToolbar: { enabled: false },
	vite: { plugins: [tailwindcss()] },
})
