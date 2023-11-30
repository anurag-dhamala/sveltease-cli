import chalk from "chalk";
import { FIGLET_WELCOME_MSG, questions } from "./constants.js";
import inquirer from "inquirer"
import Store from "./Store.js";
import {igniteFileGenerator, pkgInstaller} from "./file-utils.js";

const showWelcomeMessage=()=> {
    const chalkObj = chalk.green(FIGLET_WELCOME_MSG)
    console.log(chalkObj)
    console.log(chalk.green("Welcome to sveltease. Please answer some questions \n"))
}

const collectQuestions =  ()=> {
    return inquirer.prompt(questions);
}

export const initSvelteaseSetup = async () => {
    console.clear();
    showWelcomeMessage();
    const answers = await collectQuestions();
    Store.pkgManager = answers.pkgManager;
    Store.hasTypeScriptEnabled = answers.hasTypeScriptEnabled;
    Store.isTailwindCssUsedInSvelte = answers.isTailwindCssUsedInSvelte;
    console.log(chalk.green("Please wait while we are setting you up...."))
    pkgInstaller("sveltease").then(()=> {
        igniteFileGenerator();
    }).catch((err) => {
        console.log(chalk.red("Something went wrong. Please check the error message below: "));
        console.log(err);
    });

}