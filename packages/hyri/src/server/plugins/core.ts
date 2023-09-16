import Elysia from "elysia"
import { CORE_PREFIX } from "../../utils/constants"

import { dirname } from "path"
import { readdirSync } from 'fs'
import { tryCatch } from "../../utils/functions"
import print from "../../utils/log"
import { serverContext } from "../context"


const getCorePlugin = () => {

  const preactJsxRuntime = dirname(require.resolve('hyri-preact/jsx-runtime'))
  const preactDistDirectory = dirname(require.resolve('hyri-preact'))
  const preactHooks = dirname(require.resolve('hyri-preact/hooks'))

  const [
    hyriFiles = [],
    hyriFilesError,
  ] = tryCatch(() => readdirSync(process.cwd() + '/.hyri'))

  if (hyriFilesError) {
    print.warning("Could not find .hyri directory")
  }

  const preactFiles = [
    {
      name: 'preact.js',
      path: `${preactDistDirectory}/index.js`
    },
    {
      name: 'jsx-runtime.js',
      path: `${preactJsxRuntime}/index.js`
    },
    {
      name: 'hooks.js',
      path: `${preactHooks}/index.js`
    },
    ...serverContext.appMode === "dev" ? [
      {
        name: 'preact.js.map',
        path: `${preactDistDirectory}/index.js.map`
      },
      {
        name: 'jsx-runtime.js.map',
        path: `${preactJsxRuntime}/index.js.map`
      }
    ] : []
  ]

  const plugin = new Elysia()
    .group(CORE_PREFIX, (group) => {
      for (const file of preactFiles) {
        group.get(`/${file.name}`, () => Bun.file(file.path))
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