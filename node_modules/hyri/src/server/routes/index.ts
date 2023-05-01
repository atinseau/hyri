import type Elysia from "elysia";
import fs from 'fs'

const INTERNAL_PREFIX = '/_hyri'

function fileLoader(path: string) {
  const buffer = fs.readFileSync(path)
  return buffer.toString()
}

const bootstrap = (app: Elysia) => {

  const appPath = process.cwd()

  app.get(`${INTERNAL_PREFIX}/chunks/:bootstrap`, (ctx) => {
    const { bootstrap } = ctx.params
    const chunks = fileLoader(`${appPath}/.hyri/chunks/${bootstrap}`)
    return new Response(chunks, {
      headers: {
        'Content-Type': 'application/javascript'
      }
    })
  })

  return app
}

export {
  bootstrap
};