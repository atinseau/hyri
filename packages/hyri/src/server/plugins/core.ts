import Elysia from "elysia"
import { CORE_PREFIX } from "../../utils/constants"

import { dirname } from "path"
import { readdirSync } from 'fs'
import { tryCatch } from "../../utils/functions"
import print from "../../utils/log"


const getCorePlugin = () => {

  const preactJsxRuntime = dirname(require.resolve('hyri-preact/jsx-runtime'))
  const preactDistDirectory = dirname(require.resolve('hyri-preact'))

  const preactJsxRuntimeFiles = [
    'jsxRuntime.mjs',
  ]
  const preactFiles = [
    'preact.mjs'
  ]
  const [
    hyriFiles = [],
    hyriFilesError,
  ] = tryCatch(() => readdirSync(process.cwd() + '/.hyri'))

  if (hyriFilesError) {
    print.warning("Could not find .hyri directory")
  }

  const plugin = new Elysia()
    .group(CORE_PREFIX, (group) => {
      for (const file of preactFiles) {
        group.get(`/${file}`, () => Bun.file(`${preactDistDirectory}/${file}`))
      }
      for (const file of preactJsxRuntimeFiles) {
        group.get(`/${file}`, () => Bun.file(`${preactJsxRuntime}/${file}`))
      }
      for (const file of hyriFiles) {
        group.get(`/${file}`, () => Bun.file(`${process.cwd()}/.hyri/${file}`))
      }
      return group
    })

  return plugin
}

export {
  getCorePlugin
}