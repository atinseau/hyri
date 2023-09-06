#!/usr/bin/env bun
import { createServerProcess } from "../src/build/server/init";
import { initConfigContext } from "../src/context/configContext";
import { initGlobalContext } from "../src/context/globalContext";
import { checkHyriConfig, getHyriConfig } from "../src/utils/config";
import { getPackageJson } from "../src/utils/fileSystem";

await initGlobalContext()

const currentPackageJson = getPackageJson();
const currentHyriConfig = await getHyriConfig();

const isValid = await checkHyriConfig(currentHyriConfig);

if (isValid) {

  const configContext = initConfigContext({
    packageJson: currentPackageJson,
    hyriConfig: currentHyriConfig
  })

  await createServerProcess()

} else {
  process.exit(1)
}