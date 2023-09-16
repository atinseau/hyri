#!/usr/bin/env bun
import { createClientProcess } from "../src/client/compiler/init";
import { createServerProcess } from "../src/server/init";
import { fileExists } from "../src/utils/fileSystem";
import print from "../src/utils/log";

try {

  if (!(await fileExists(`${process.cwd()}/hyri.config.ts`))) {
    throw new Error("Could not find hyri.config.ts")
  }

  // createClientProcess();
  await createServerProcess();
} catch (error) {
  print.error((error as Error)?.message || "An error occured")
  process.exit(1)
}


