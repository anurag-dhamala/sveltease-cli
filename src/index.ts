import chalk from "chalk";
import { init } from "./svelte-cli.js";

const args = process.argv.slice(2);

if(!(args.length === 1)) {
    console.log(chalk.red("Invalid no. of arguments"));
    process.exit(-1);
}

init();