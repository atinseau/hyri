import { renderTree } from "../client/render/tree"
import { BuildManifest } from "../types/render"
import { getHyriConfig } from "../utils/config"
import print from "../utils/log"
import { createElysia } from "./app"

// import

try {
  const hyriConfig = await getHyriConfig()
  const routes = Object.entries(hyriConfig.views)
  const app = createElysia()

  const buildManifestFile = Bun.file(`${process.cwd()}/.hyri/buildManifest.json`)
  let buildManifest: BuildManifest = {
    scripts: {}
  }
  if (await buildManifestFile.exists()) {
    buildManifest = await buildManifestFile.json() as typeof buildManifest
  }

  for (const [route, component] of routes) {
    app.get(route, (req) => {
      return new Response(renderTree(component, buildManifest.scripts[route], req), {
        headers: {
          'Content-Type': 'text/html'
        }
      })
    })
  }

  app.listen(3000, () => {
    console.log(`Listening on port ${3000}`)
  })

} catch (e) {
  print.error((e as Error)?.message || "An error occured")
  process.exit(1)
}