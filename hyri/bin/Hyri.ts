import HyriContext from "hyri/bin/HyriContext"
import HyriClient from "hyri/bin/compile/HyriClient"
import { createHyriProcess } from "hyri/bin/lib/hyriProcess"

class Hyri {

  private hyriClient: HyriClient

  constructor(hyriConfig: HyriConfig) {
    HyriContext.init({
      hyriConfig
    })
    this.hyriClient = new HyriClient()
  }

  async run() {
    const packageJson = await HyriContext.loadPackageJson()
    if (!packageJson) {
      throw new Error('No main file in package.json')
    }

    const hyriConfig = HyriContext.hyriConfig
    const entryPoint = hyriConfig.appPath + '/' + packageJson.main
    
    createHyriProcess({
      entryPoint,
      mode: hyriConfig.command,
      onStarted: () => {
        this.hyriClient.run()
      }
    })
  }
}

export default Hyri;