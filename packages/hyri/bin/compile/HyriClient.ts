import HyriContext from "bin/HyriContext";
import { directoryExists, getAllFiles, matchExtension } from "utils/files";
import fs from "fs";

import {
  ALLOWED_FILES,
  BOOTSTRAP_FILES,
  BUILD_DIR,
  IGNORED_FILES
} from 'utils/constants'

class HyriClient {

  private appPath: string
  // private transpiler: InstanceType<typeof Bun.Transpiler>

  constructor() {
    this.appPath = HyriContext.hyriConfig.appPath
    // this.transpiler = new Bun.Transpiler({
    //   loader: 'tsx'
    // })
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

  
  // private async transpile(content: string) {
  //   const result = await this.transpiler.transform(content)
  //   return result
  // }

  private async bundle() {
    let output = ""

    const files = getAllFiles(this.appPath).filter((file) => (
      matchExtension(file, ALLOWED_FILES)
      && !matchExtension(file, IGNORED_FILES)
    ))

    if (!directoryExists(this.appPath + "/" +  BUILD_DIR)) {
      fs.mkdirSync(this.appPath + "/" +  BUILD_DIR)
    }

    console.log(files)
  }

  private async build() {
    this.bootstrap()
    await this.bundle()
  }

  run() {
    this.build()
  }

}

export default HyriClient;