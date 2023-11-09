import chalk from "chalk";
import figlet from "figlet";


const INTRO_TEXT = "Welcome to svelte-cli"

const welcomeFiglet = figlet.textSync(INTRO_TEXT, {
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100

})

const init = async () => {
    const chalkObj = chalk.green(welcomeFiglet)
    console.log(chalkObj)
}

init();