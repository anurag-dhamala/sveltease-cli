import figlet from "figlet";

const INTRO_TEXT = "svelte-cli"

export const FIGLET_WELCOME_MSG = figlet.textSync(INTRO_TEXT, {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100

})

export const questions = [
    {
        name: "hasTypescriptEnabled",
        type: "confirm",
        message: "Are you using TypeScript? (default=Y)",
        default: true
    }, 
    {
        name: "isTailwindCssUsedInSvelte",
        type: "confirm",
        message: "Do the svelte components that you want to use have tailwind css? (default=Y)",
        default: true
    },
]