import chalk from "chalk";
import { initSvelteaseSetup } from "./svelte-cli.js";
import { checkIfProjectDir } from "./file-utils.js";
import {availableInitOptions} from "./constants.js";
import * as process from "process";
import Store from "./Store.js";



if(!checkIfProjectDir()) {
    console.log(chalk.red("Current directory doesn't contain package.json. Exiting..."))
    process.exit(1);
}

const args = process.argv.slice(2);
if(args.length !==2) {
    console.log(chalk.red("Invalid no. of arguments."));
    process.exit(1);
}

if(args[0] !=="init") {
    console.log(
        chalk.red("Invalid command."),
        "\n",
        chalk.greenBright("Try npx sveltease-cli init vite|next|webpack"),
        "\n",
        chalk.red("Exiting...")
    );
    process.exit(1);
}

if(!availableInitOptions.includes(args[1])) {
    console.log(
        chalk.red("Invalid command.\n"),
        chalk.greenBright("Try npx sveltease-cli init vue | react-vite | react-cra | next\n"),
        chalk.red("Exiting...")
    );
    process.exit(1);
}

Store.initOptions = args[1] as 'vue' | 'react-cra' | 'react-vite' | 'next';

initSvelteaseSetup();