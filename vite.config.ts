import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';
import presetWebFonts from '@unocss/preset-web-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      presets: [
        presetUno(),
        presetIcons(),
        presetWebFonts({
          provider: 'fontshare',
          fonts: {
            sans: 'Public Sans:400,700',
          },
        }),
      ],
      safelist: [...Array.from({length: 101}, (_, i) => `w-[${i}%]`)],
      shortcuts: [
        {btn: 'py-2 px-4 font-semibold rounded-lg shadow-lg'},
        [
          /^btn-(.*)$/,
          ([, c]) =>
            `btn bg-${c}-700 text-${c}-100 shadow-${c} active:bg-${c}-800 disabled:bg-${c}-900 disabled:active:bg-${c}-900 disabled:text-${c}-500`,
        ],
        [
          /^pb-(.*)$/,
          ([, c]) =>
            `bg-gradient-to-r from-${c}-700 via-${c}-600 to-${c}-700 h-12 transition-[width] duration-[2s] backface-hidden justify-center`,
        ],
      ],
    }),
    react(),
  ],
});
