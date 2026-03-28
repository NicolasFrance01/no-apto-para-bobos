import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/no-apto-para-bobos/',
    build: {
        rollupOptions: {
            input: {
                main: resolve('index.html'),
                sonica: resolve('sonica.html'),
                artemis: resolve('artemis.html'),
                sorteos: resolve('sorteos/sorteos.html'),
            },
        },
    },
})
