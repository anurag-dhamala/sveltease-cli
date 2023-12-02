import chalk from "chalk";
import {FIGLET_WELCOME_MSG, getQuestions} from "./constants.js";
import inquirer from "inquirer"
import Store from "./Store.js";
import {igniteFileGenerator, pkgInstaller} from "./file-utils.js";

const showWelcomeMessage=()=> {
    const chalkObj = chalk.greenBright(FIGLET_WELCOME_MSG)
    console.log(chalkObj)
    console.log(chalk.greenBright("Welcome to sveltease. Please answer some questions \n"))
}

const collectQuestions =  ()=> {
    return inquirer.prompt(getQuestions());
}

export const initSvelteaseSetup = async () => {
    console.clear();
    showWelcomeMessage();
    const answers = await collectQuestions();
    Store.pkgManager = answers.pkgManager;
    Store.hasTypeScriptEnabled = answers.hasTypeScriptEnabled;
    Store.webpackWithCommonJs = answers.webpackWithCommonJs;
    // Store.isTailwindCssUsedInSvelte = answers.isTailwindCssUsedInSvelte;
    console.log(chalk.greenBright("Please wait while we are setting you up...."))
    pkgInstaller("sveltease").then(()=> {
        igniteFileGenerator();
    }).catch((err) => {
        console.log(chalk.red("Something went wrong. Please check the error message below: "));
        console.log(err);
    });

}