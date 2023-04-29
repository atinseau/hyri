import HyriContext from "bin/HyriContext";
import { directoryExists, getAllFiles, matchExtension } from "utils/files";
import fs from "fs";

const ALLOWED_FILES = [
  '.ts',
  '.tsx',
]

const IGNORED_FILES = [
  '.d.ts'
]

const BUILD_DIR = '.hyri'

class HyriClient {

  private appPath: string
  private transpiler: InstanceType<typeof Bun.Transpiler>

  constructor() {
    this.appPath = HyriContext.hyriConfig.appPath
    this.transpiler = new Bun.Transpiler({
      loader: "tsx",
    });
  }

  private async transpile(content: string) {
    const result = await this.transpiler.transform(content)

    console.log(result)
  }

  private async build() {
    const files = getAllFiles(this.appPath).filter((file) => (
      matchExtension(file, ALLOWED_FILES)
      && !matchExtension(file, IGNORED_FILES)
    ))


    if (!directoryExists(this.appPath + "/" +  BUILD_DIR)) {
      fs.mkdirSync(this.appPath + "/" +  BUILD_DIR)
    }

    for (const file of files) {
      const buffer = fs.readFileSync(file)
      const content = buffer.toString()
      this.transpile(content)
    }
  }

  run() {
    this.build()
  }

}

export default HyriClient;