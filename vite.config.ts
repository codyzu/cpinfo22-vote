import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      presets: [presetUno(), presetIcons()],
      safelist: [...Array.from({length: 101}, (_, i) => `w-[${i}%]`)],
      shortcuts: [
        {btn: 'py-2 px-4 font-semibold rounded-lg shadow-md'},
        [
          /^btn-(.*)$/,
          ([, c]) =>
            `bg-${c}-700 text-${c}-100 border-2 border-${c}-800 btn active:bg-${c}-800 disabled:bg-${c}-900 disabled:active:bg-${c}-900 disabled:text-${c}-500`,
        ],
        [
          /^pb-(.*)$/,
          ([, c]) =>
            `bg-gradient-to-b from-${c}-700 via-${c}-600 to-${c}-700 h-12 transition-[width] duration-[2s] backface-hidden justify-center`,
        ],
      ],
    }),
    react(),
  ],
});
