import type { HyriConfigRequired } from "../types/hyriConfig"
import type { PackageJson } from "../types/packageJson"
import print from "../utils/log"

type ConfigContext = {
  hyriConfig: HyriConfigRequired
  packageJson: PackageJson
}

let configContext = {} as ConfigContext

function initConfigContext(conf: ConfigContext) {
  configContext.hyriConfig = conf.hyriConfig
  configContext.packageJson = conf.packageJson

  return configContext
}

export {
  initConfigContext,
}

export default configContext