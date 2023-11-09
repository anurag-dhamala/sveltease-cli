import { checkIfFileExists, getDirName } from "./file-handler.js";


const dirname = getDirName();

export async function checkIfViteProject() {

    const tsViteConfig = await checkIfFileExists(dirname+"/vite.config.js");
    const jsViteConfig = await checkIfFileExists(dirname+"vite.config.ts");
    console.log(tsViteConfig);
    console.log(jsViteConfig);

    if(!tsViteConfig && !jsViteConfig) {
        return false;
    }
    return true;
}