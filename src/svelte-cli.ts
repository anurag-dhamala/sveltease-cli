import chalk from "chalk";
import { FIGLET_WELCOME_MSG, questions } from "./constants.js";
import inquirer from "inquirer"
import { handleTypeScript } from "./typescript-handler.js";
import { handleTailwind } from "./tailwind-handler.js";
import { checkIfViteProject } from "./vite-handler.js";

const showWelcomeMessage=()=> {
    const chalkObj = chalk.green(FIGLET_WELCOME_MSG)
    console.log(chalkObj)
    console.log(chalk.green("Welcome to sveltease-cli. Please answer some questions \n"))
}

const collectQuestions=()=> {
    return inquirer.prompt(questions);
}


export const init = async () => {
    console.clear();
    showWelcomeMessage();

    const answers = await collectQuestions();
    
    console.log(chalk.green("Please wait while we are setting you up...."))

    const isViteProject: boolean = await checkIfViteProject();
    if(!isViteProject) {
        console.log(chalk.red("\nLooks like you are not in a vite project. Automatic configuration through sveltease-cli only supports vite for now. Please setup svelte in your project manually. Then you can use sveltease. Thankyou."))
        process.exit(-1);
    }
    handleTypeScript(answers.hasTypescriptEnabled);
    handleTailwind(answers.isTailwindCssUsedInSvelte);
}