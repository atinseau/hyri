import Hyri from "hyri/bin/Hyri";
import { getHyriConfig } from "hyri/bin/lib/hyriConfig";
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