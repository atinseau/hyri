import {
  HyriConfigRequiredSchema,
  type HyriConfig,
  type HyriConfigRequired
} from "../types/hyriConfig";
import { fileExists, directoryExists, getExecutionPath } from "./fileSystem";
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


const checkHyriConfig = async (hyriConfig: HyriConfigRequired): Promise<boolean> => {
  const parseResult = HyriConfigRequiredSchema.safeParse(hyriConfig);

  // Check if the hyri config is valid
  if (!parseResult.success) {
    throw new Error('Invalid hyri.config.ts file')
  }

  if (!directoryExists(hyriConfig.pagesDir)) {
    throw new Error(`Pages directory ${hyriConfig.pagesDir} does not exist`)
  }

  return true
}


const importHyriConfig = async (): Promise<HyriConfigRequired> => {
  const hyriConfigExists = await fileExists(`${getExecutionPath()}` + '/hyri.config.ts')
  if (!hyriConfigExists) {
    print.warning('No hyri.config.ts file found, using default configuration')
    return defaultConfig()
  }
  const hyriConfig = require(`${getExecutionPath()}` + '/hyri.config.ts');
  if (!('default' in hyriConfig)) {
    print.warning('No default export found in hyri.config.ts file, using default configuration')
    return defaultConfig()
  }

  try {
    await checkHyriConfig(hyriConfig.default)
    return hyriConfig.default
  } catch (error) {
    print.error(error)
    throw error
  }
}

export {
  define,
  defaultConfig,
  checkHyriConfig,
  importHyriConfig
}