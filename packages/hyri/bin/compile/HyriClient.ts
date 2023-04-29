import HyriContext from "bin/HyriContext";
import { directoryExists } from "utils/files";
import fs from "fs";

import {
  ALLOWED_FILES,
  BOOTSTRAP_FILES,
  BUILD_DIR,
  IGNORED_FILES
} from 'utils/constants'

class HyriClient {

  private appPath: string

  constructor() {
    this.appPath = HyriContext.hyriConfig.appPath
  }

  private async bootstrapFile(bootstrapModule: BootstrapModule) {
    const modulePathWithIndex = await import.meta.resolve(bootstrapModule.module)
    const modulePath = modulePathWithIndex.replace('/index.js', '')
    const umd = fs.readFileSync(modulePath + bootstrapModule.path)

    if (!directoryExists(this.appPath + "/" + BUILD_DIR + "/chunks")) {
      fs.mkdirSync(this.appPath + "/" + BUILD_DIR + "/chunks")
    }
    fs.writeFileSync(this.appPath + "/" + BUILD_DIR + "/chunks/" + bootstrapModule.output, umd)
  }

  private async bootstrap() {
    const queue = [] as Promise<void>[]
    for (const file of BOOTSTRAP_FILES) {
      queue.push(this.bootstrapFile(file))
    }
    await Promise.all(queue)
  }

  private async bundle(entryPoint: string) {

    console.log(entryPoint)
  }

  private async build() {
    this.bootstrap()
    const packageJson = await HyriContext.loadPackageJson()
    if (!packageJson) {
      throw new Error("No package.json found")
    }
    const mainPath = this.appPath + "/" + packageJson.main
    await this.bundle(mainPath)
  }

  run() {
    this.build()
  }

}

export default HyriClient;