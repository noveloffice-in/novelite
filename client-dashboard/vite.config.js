import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';
import proxyOptions from './proxyOptions';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8080,
        proxy: proxyOptions
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // from config1
            src: resolve(__dirname, 'src'), // from config2
        },
    },
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
            plugins: [
                {
                    name: 'load-js-files-as-jsx',
                    setup(build) {
                        build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
                            loader: 'jsx',
                            contents: await fs.readFile(args.path, 'utf8'),
                        }));
                    },
                },
            ],
        },
    },
    plugins: [svgr(), react()],
    build: {
        outDir: '../novelite/public/client-dashboard',
        emptyOutDir: true,
        target: 'es2015',
    },
});
