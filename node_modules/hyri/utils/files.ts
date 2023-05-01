import fs from 'fs'
import path from 'path'

/**
* List all files in directory recursively in a synchronous function
*/
function getAllFiles(dir: string) {
  const files = [] as string[]
  const list = (dir: string) => {
    const filesInDir = fs.readdirSync(dir)
    for (const file of filesInDir) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        list(filePath)
      } else {
        files.push(filePath)
      }
    }
  }
  list(dir)
  return files
}

function matchExtension(file: string, extensions: string[]) {
  for (const extension of extensions) {
    if (file.endsWith(extension)) {
      return true
    }
  }
}

function directoryExists(dir: string) {
  try {
    return fs.statSync(dir).isDirectory();
  } catch (err) {
    return false;
  }
}

export {
  getAllFiles,
  matchExtension,
  directoryExists
}