import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    
    adapter: adapter(),
    alias: {
      '@emailjs/browser': 'node_modules/@emailjs/browser',
      // Additional aliases can be added here if needed, e.g.:
      // $lib: 'src/lib',
      // $components: 'src/components'
    }
  },
  preprocess: vitePreprocess(),
}

export default config;