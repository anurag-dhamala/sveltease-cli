import figlet from "figlet";
import Store from "./Store.js";

const INTRO_TEXT = "sveltease"

export const FIGLET_WELCOME_MSG = figlet.textSync(INTRO_TEXT, {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100
})

export const getQuestions=()=> {
    let defaultQns =  [
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
    ]
    if(Store.initOptions === 'webpack') {
       defaultQns = [...defaultQns, {
           name: "webpackWithCommonJs",
           default: false,
           message: "Are you using common js for webpack configuration? (default=N)",
           type: "confirm"
       }]
    }
    return defaultQns;
}

export const availableInitOptions = ['vue', 'react-vite', 'react-cra', 'next', 'webpack']

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

export const getWebpackConfigContentCJS=(fileName: string)=> {
    return `
const {merge} = require('webpack-merge');
const baseConfig = require('${fileName}');
module.exports = merge(baseConfig, {
    module: {
    rules: [
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
}
});
`
}

export const getWebpackConfigContentESM=(fileName: string)=> {
    return `
import {merge} from 'webpack-merge';
import baseConfig from '${fileName}';
export default merge(baseConfig, {
    module: {
    rules: [
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
}
});    
`
}