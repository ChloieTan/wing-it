import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/public/assets/css/index.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
