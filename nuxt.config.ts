import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-02-15",
  devtools: { enabled: true },
  modules: ["@prisma/nuxt"],
  css: ['~/public/assets/css/index.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})