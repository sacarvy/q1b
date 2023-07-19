import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import Icons from "unplugin-icons/vite";
import solidJs from "@astrojs/solid-js";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc"
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://sukhpreet.dev",
    integrations: [
        tailwind({
            config: {
                applyBaseStyles: false,
            },
        }),
        react(),
        markdoc(),
        svelte(),
        solidJs(),
        sitemap(),
    ],
    vite: {
        plugins: [
            Icons({
                compiler: 'astro',
                // experimental
                autoInstall: true,
            }),
        ],
    }
});
