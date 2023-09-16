import { PackageJson } from "../types/packageJson";
import { existsSync } from 'fs'

async function fileExists(path: string) {
  return await Bun.file(path).exists()
}

function directoryExists(path: string) {
  return existsSync(path)
}


const getExecutionPath = (): string => {
  return process.cwd()
}

const getPackageJson = (): PackageJson => {
  const packageJson = require(`${getExecutionPath()}` + '/package.json');
  return packageJson;
}


export {
  fileExists,
  directoryExists,
  getPackageJson,
  getExecutionPath
}