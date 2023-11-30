import figlet from "figlet";

const INTRO_TEXT = "sveltease"

export const FIGLET_WELCOME_MSG = figlet.textSync(INTRO_TEXT, {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100
})

export const questions = [
    {
        name: "pkgManager",
        type: "string",
        message: "Which package manager are you using? [npm (default) | pnpm | yarn]",
        default: "npm"
    },
    {
        name: "hasTypeScriptEnabled",
        type: "confirm",
        message:"Are you using typescript? (default=Y)",
        default: true
    }
    // {
    //     name: "isTailwindCssUsedInSvelte",
    //     type: "confirm",
    //     message: "Do the svelte components that you want to use have tailwind css? (default=Y)",
    //     default: false
    // },
]

export const availableInitOptions = ['vue', 'react-vite', 'react-cra', 'next']

export const defaultReactViteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {svelte} from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svelte()],
})
`

export const defaultVueViteConfig=`
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {svelte} from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), svelte()],
})
`

export const svelteConfigJs=`
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
`

export const nextConfigJs = `
/** @type {import('next').NextConfig} */
nextConfig = {
    webpack: (
      config,
    ) => {
      // Important: return the modified config
      config.module.rules.push({
            test: /\\.(html|svelte)$/,
            use: 'svelte-loader',
      })
      config.module.rules.push(
         {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\\/svelte\\/.*\\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
      )
      return config
    },
  }
module.exports = nextConfig
`

export const craReactConfigJS = `
module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...
    config.module.rules = [...config.module.rules, 
        {
            test: /\\.(html|svelte)$/,
            use: 'svelte-loader',
        },
        {
            // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
            test: /node_modules\\/svelte\\/.*\\.mjs$/,
            resolve: {
              fullySpecified: false
            }
        }
      ]
    return config
}
`