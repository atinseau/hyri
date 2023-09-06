import configContext from "../../context/configContext";
import globalContext from "../../context/globalContext";
import { injectContext } from "./init";

import { watch } from "fs";

injectContext()

const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: './src/pages',
})

console.log(globalContext.executionPath)

setInterval(() => {
  router.reload()
}, 100)

const watcher = watch(globalContext.executionPath, { recursive: true }, (event, fileName) => {
  router.reload()
  console.log("event: ", event)
  console.log("fileName: ", fileName)
  console.log("router: ", router)
})

console.log('router: ', router)



