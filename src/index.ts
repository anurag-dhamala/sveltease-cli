#!/usr/bin/env node


import chalk from "chalk";
import { initSvelteaseSetup } from "./svelte-cli.js";
import { checkIfProjectDir } from "./file-utils.js";
import {availableInitOptions} from "./constants.js";
import * as process from "process";
import Store from "./Store.js";



if(!checkIfProjectDir()) {
    console.log(chalk.redBright("Current directory doesn't contain package.json. Exiting."))
    process.exit(1);
}

const args = process.argv.slice(2);
const isWebpackInit = args[1] && args[1] === 'webpack';
if(!isWebpackInit && args.length !==2) {
    console.log(chalk.redBright("Invalid no. of arguments."));
    process.exit(1);
}

if(args[0] !=="init") {
    console.log(
        chalk.redBright("Invalid command."),
        "\n",
        chalk.greenBright("Try npx sveltease-cli init [vite|next|webpack]"),
        "\n",
        chalk.redBright("Exiting.")
    );
    process.exit(1);
}

if(!availableInitOptions.includes(args[1])) {
    console.log(
        chalk.redBright("Invalid command.\n"),
        chalk.greenBright("Try npx sveltease-cli init vue | react-vite | react-cra | next | webpack\n"),
        chalk.redBright("Exiting.")
    );
    process.exit(1);
}

if(args[1] === "webpack" && !args[2]) {
    console.log(
        chalk.redBright("You must provide your webpack config file name along with webpack.\n"),
        chalk.greenBright("Try npx sveltease-cli init webpack webpack.config.js\n"),
        chalk.redBright("Exiting.")
    );
    process.exit(1);
}

if(args[1] === "webpack" && !Store.files.includes(args[2])) {
    console.log(
        chalk.redBright("The webpack file you provided doesn't exist. Exiting.")
    );
    process.exit(1);
}

Store.webpackFileName = args[2];
Store.initOptions = args[1] as 'vue' | 'react-cra' | 'react-vite' | 'next' | 'webpack';

initSvelteaseSetup();