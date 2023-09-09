#!/usr/bin/env bun
import { createServerProcess } from "../src/build/server/init";
import { importHyriConfig } from "../src/utils/config";

try {
  const currentHyriConfig = await importHyriConfig();
  await createServerProcess(currentHyriConfig);
} catch (error) {
  console.error(error)
  process.exit(1)
}


