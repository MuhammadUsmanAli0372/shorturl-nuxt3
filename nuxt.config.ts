// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appUrl: "http://localhost:3000",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
});