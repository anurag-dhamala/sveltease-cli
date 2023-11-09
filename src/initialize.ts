import chalk from "chalk";
import { FIGLET_WELCOME_MSG, questions } from "./constants.js";
import inquirer from "inquirer"
import { handleTypeScript } from "./handlers/typescript-handler.js";
import { handleTailwind } from "./handlers/tailwind-handler.js";

const showWelcomeMessage=()=> {
    const chalkObj = chalk.green(FIGLET_WELCOME_MSG)
    console.log(chalkObj)
    console.log(chalk.green("Welcome to svelte-cli. Please answer some questions \n"))
}

const collectQuestions=()=> {
    return inquirer.prompt(questions);
}


export const init = async () => {
    console.clear();
    showWelcomeMessage();

    const answers = await collectQuestions();
    console.log(answers);
    
    handleTypeScript(answers.hasTypescriptEnabled);
    handleTailwind(answers.isTailwindCssUsedInSvelte);
}