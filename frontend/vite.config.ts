import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths'
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: 'autoUpdate',
    devOptions: {
        enabled: true
    },
    manifest: {
        name: 'Заявки на проведение тендера',
        short_name: 'Заявки на проведение тендера',
        description: 'Description',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ]
    }
};

export default defineConfig({
    base: "/front/",
    plugins: [
        react(),
        tsconfigPaths(),
        VitePWA(manifestForPlugin)
    ],
    server: {
        host: true
    },
});
