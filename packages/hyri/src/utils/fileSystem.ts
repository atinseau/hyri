import globalContext from "../context/globalContext";
import { PackageJson } from "../types/packageJson";

import { existsSync } from 'fs'


async function fileExists(path: string) {
  return await Bun.file(path).exists()
}

function directoryExists(path: string) {
  return existsSync(path)
}


const getPackageJson = (): PackageJson => {
  const packageJson = require(`${globalContext.executionPath}` + '/package.json');
  return packageJson;
}


export {
  fileExists,
  directoryExists,
  getPackageJson
}