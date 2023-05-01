import Hyri from "./Hyri";
import { getHyriConfig } from "./lib/hyriConfig";
import logger from "common/logger";

try {
  const config = getHyriConfig()
  const hyri = new Hyri({
    appPath: process.cwd(),
    ...config
  })
  hyri.run()
} catch (e) {
  logger.error((e as any).message)
}