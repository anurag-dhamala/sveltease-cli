import fs from "fs";
import Store from "./Store.js";
import chalk from "chalk";
import {exec, execSync} from "node:child_process";
import * as process from "process";
import {
    craReactConfigJS,
    defaultReactViteConfig,
    defaultVueViteConfig,
    nextConfigJs,
    svelteConfigJs
} from "./constants.js";

export const getDirName=()=>{
    const buf = execSync('pwd');
    return buf.toString('utf-8').trimEnd();
}

export const checkIfProjectDir=()=>{
  const files = fs.readdirSync(getDirName());
  Store.files = [...files];
  return files.includes('package.json');
}

const initiateViteSetup=()=>{
    pkgInstaller("@sveltejs/vite-plugin-svelte", "dev").then(()=> {
        console.log(
            chalk.green("Additional packages installation completed! Configuring...")
        );
        const viteConfigFile = Store.hasTypeScriptEnabled ? 'vite.config.ts': 'vite.config.js';
        if(!Store.files.includes(viteConfigFile)) {
            console.log(
                chalk.red("Using vite but no vite.config.ts? I am confused.")
            );
            process.exit(1);
        }
        const filePath = `${getDirName()}/${viteConfigFile}`;
        const configContent = fs.readFileSync(`${getDirName()}/${viteConfigFile}`, 'utf-8');
        copyFile(filePath, `${filePath}.backup`)

        if(Store.hasTypeScriptEnabled) {
            writeFile(getDirName()+'/svelte.config.js', svelteConfigJs);
        }
        if(!configContent.includes("react") && !configContent.includes("vue")) {
            console.log(
                chalk.red("I am just v1 years old. I can only configure vue and react projects and looks like you are not using either of them.")
            );
            process.exit(1);
        }

        if(configContent.includes("react")) {
            writeFile(filePath, defaultReactViteConfig);
            return;
        }
        if(configContent.includes("vue")) {
            writeFile(filePath, defaultVueViteConfig);
            return;
        }
        console.log(
            chalk.red("I probably messed up as I am just v1 years old. Please try again or try manual configuration. Checkout readme.")
        )
        process.exit(1);
    }).catch(err=>{
        console.log(
            chalk.red("Something went wrong. Check the error below: \n"),
            chalk.red(err)
        )
        process.exit(1);
    })
}

const initiateNextFileSetup=()=>{
    pkgInstaller("svelte-loader", "dev").then(()=> {
        console.log(
            chalk.green("Additional packages installation completed! Configuring...")
        );
        const nextConfigFile = 'next.config.js';
        if(!Store.files.includes(nextConfigFile)) {
            console.log(
                chalk.red("Using vite but no vite.config.ts? I am confused.")
            );
            process.exit(1);
        }
        const filePath = `${getDirName()}/${nextConfigFile}`;
        copyFile(filePath, `${filePath}.backup`)
        writeFile(filePath, nextConfigJs);
    }).catch(err=>{
        console.log(
            chalk.red("Something went wrong. Check the error below: \n"),
            chalk.red(err)
        )
        process.exit(1);
    })
}

const initiateCraReactSetup=()=> {
    pkgInstaller("react-app-rewired", "dev").then(async ()=> {
        console.log(
            chalk.green("Additional packages installation completed! Configuring...")
        );
        const filePath = `${getDirName()}/config-overrides.js`;
        await pkgInstaller("svelte-loader", "dev");
        writeFile(filePath, craReactConfigJS);
        const pkgContent = fs.readFileSync(`${getDirName()}/package.json`, 'utf-8');
        let obj = JSON.parse(pkgContent);
        obj = {
            ...obj,
            "scripts": {
                ...obj.scripts,
                "start": "react-app-rewired start",
                "build": "react-app-rewired build",
                "test": "react-app-rewired test"
            }
        }
        console.log(
            chalk.yellowBright(
                "Warning: For react projects with create-react-app I need to change the package.json scripts. I have also installed react-app-rewired as cra is HELL."
            )
        )
        writeFile(`${getDirName()}/package.json`, JSON.stringify(obj));
    }).catch(err=>{
        console.log(
            chalk.red("Something went wrong. Check the error below: \n"),
            chalk.red(err)
        )
        process.exit(1);
    })
}


const copyFile=(src: string, destination: string)=>{
    try {
        fs.copyFileSync(src, destination);
    } catch (e) {
        console.log(
            chalk.red("Cannot copy the existing config in backup file. I cannot proceed ahead with such risks. Exiting...")
        )
        process.exit(1);
    }
}

const writeFile=(filePath: string, content: string)=>{
    try {
        fs.writeFileSync(filePath, content);
    } catch (e) {
        console.log(
            chalk.red("Cannot write to the config file. Looks like you need to manually edit the config. I am extremely sorry. Exiting...")
        )
        process.exit(1);
    }
}

export const igniteFileGenerator=()=>{
    switch (Store.initOptions){
        case "vue":
        case "react-vite":
            initiateViteSetup();
            break;
        case "next":
            initiateNextFileSetup();
            break;
        case "react-cra":
            initiateCraReactSetup();
            break;
        default:
            console.log(
                chalk.red(
                    "Looks like you didn't provide valid init options. Choose one of them: \n",
                ),
                chalk.yellowBright("vue, react-vite, react-cra, next")
            )
            return;
    }
}

const installationCmd=(pkg: string, mode: 'dev' | 'normal')=> {
    const action = Store.pkgManager !== "yarn" ? 'install': 'add';
    if(mode === "dev") {
        return `${Store.pkgManager} ${action} ${pkg} -D`
    }
    return `${Store.pkgManager} ${action} ${pkg}`
}

export const pkgInstaller= (pkg: string, mode: "dev" | "normal" = "normal")=> {
    return new Promise<void>((resolve, reject) => {
        console.log(chalk.green(`Installing ${pkg}...`))
        exec(installationCmd(pkg, mode), (error: any, stdout: any, stderr: any) => {
            if(error) {
                reject(error);
            } if(stdout) {
                resolve();
            }
            if(stderr) {
                reject(stderr);
            }
        })
    })
}