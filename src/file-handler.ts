import fs from "fs";
import path from "path"
import { fileURLToPath } from 'url';

export const getDirName=()=>{
    const __filename = fileURLToPath(import.meta.url);
    return path.dirname(__filename);
}


export const checkIfFileExists=async(filepath: string)=> {
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.constants.F_OK, error => {
          resolve(!error);
        });
      });
}

export const createFile=async(fileName: string, fileContent: string) => {

}

export const modifyFile=async(fileName: string, modifiedFileContent: string)=>{

}