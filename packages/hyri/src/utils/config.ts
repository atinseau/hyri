import globalContext from "../context/globalContext";
import {
  HyriConfigRequiredSchema,
  type HyriConfig,
  type HyriConfigRequired
} from "../types/hyriConfig";
import { fileExists, directoryExists } from "./fileSystem";
import print from "./log";

/**
 * Define a hyri config
 * you can use this function in the hyri.config.ts file
 * to customize your application configuration.
 * 
 * Several options are available to you:
 * - pagesDir: the directory where your pages are located (default: src/pages)
 * 
 * etc...
 * 
 * @public
 */
function define(hyriConfig: HyriConfig) {
  return hyriConfig
}

function defaultConfig(): HyriConfigRequired {
  return {
    pagesDir: 'src/pages'
  }
}

const getHyriConfig = async (): Promise<HyriConfigRequired> => {
  const hyriConfigExists = await fileExists(`${globalContext.executionPath}` + '/hyri.config.ts')
  if (!hyriConfigExists) {
    print.warning('No hyri.config.ts file found, using default configuration')
    return defaultConfig()
  }
  const hyriConfig = require(`${globalContext.executionPath}` + '/hyri.config.ts');
  if (!('default' in hyriConfig)) {
    print.warning('No default export found in hyri.config.ts file, using default configuration')
    return defaultConfig()
  }
  const hyriConfigDefault = hyriConfig.default
  hyriConfigDefault.pagesDir = globalContext.executionPath + "/" + hyriConfigDefault.pagesDir
  return hyriConfigDefault;
}

const checkHyriConfig = async (hyriConfig: HyriConfigRequired): Promise<boolean> => {
  const parseResult = HyriConfigRequiredSchema.safeParse(hyriConfig);

  // Check if the hyri config is valid
  if (!parseResult.success) {
    print.error('Invalid hyri.config.ts file')
    return false
  }

  if (!directoryExists(hyriConfig.pagesDir)) {
    print.error(`Pages directory ${hyriConfig.pagesDir} does not exist`)
    return false
  }

  return true
}

export {
  define,
  defaultConfig,
  checkHyriConfig,
  getHyriConfig
}