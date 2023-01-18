import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [unocss({presets: [presetUno(), presetIcons()], safelist: [
    ...Array.from({length: 101}, (_,i) => `w-[${i}%]`)
  ]}), react()],
})
