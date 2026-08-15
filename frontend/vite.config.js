// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// });  

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
      ],

      manifest: {
        name: "Fertilizer AI Learning Simulator",
        short_name: "Fertilizer AI",
        description:
          "AI-powered fertilizer and crop yield learning simulator",
        theme_color: "#16a34a",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",

        // icons: [
        //   {
        //     src: "/pwa-192x192.png",
        //     sizes: "192x192",
        //     type: "image/png",
        //   },
        //   {
        //     src: "/pwa-512x512.png",
        //     sizes: "512x512",
        //     type: "image/png",
        //   },
        //   {
        //     src: "/pwa-512x512.png",
        //     sizes: "512x512",
        //     type: "image/png",
        //     purpose: "any maskable",
        //   },
        // ],
        icons: [
  { src: "pwa-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
  { src: "pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
  { src: "pwa-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
]
      },

      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html",
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
});