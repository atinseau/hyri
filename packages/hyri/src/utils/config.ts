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


const checkHyriConfig = async (hyriConfig: HyriConfigRequired) => {
  const parseResult = HyriConfigRequiredSchema.safeParse(hyriConfig);
  // Check if the hyri config is valid
  if (!parseResult.success) {
    throw new Error('Invalid hyri.config.ts file')
  }
  return parseResult.data as HyriConfigRequired
}

const importHyriConfig = () => {
  const hyriConfig = require(`${getExecutionPath()}` + '/hyri.config.ts');
  if (!('default' in hyriConfig)) {
    throw new Error('No default export found in hyri.config.ts file')
  }
  return hyriConfig.default as HyriConfigRequired
}

const getHyriConfig = async (): Promise<HyriConfigRequired> => {
  try {
    const hyriConfigExists = await fileExists(`${getExecutionPath()}` + '/hyri.config.ts')
    if (!hyriConfigExists) {
      throw new Error('No hyri.config.ts file found')
    }
    const hyriConfig = importHyriConfig()

    return await checkHyriConfig(hyriConfig)
  } catch (error) {
    print.error(error)
    throw error
  }
}

export {
  define,
  importHyriConfig,
  checkHyriConfig,
  getHyriConfig
}