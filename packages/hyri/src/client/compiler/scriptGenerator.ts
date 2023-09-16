import { BuildManifest } from "../../types/render"

const generationCache: Map<string, string> = new Map()

const getHydrateImport = () => {
  return `import { hydrate } from 'hyri-preact'\n`
}

const getHydrateCall = (componentName: string) => {
  return `hydrate(jsxDEV(${componentName}, {}, void 0, false, {}, this), document.getElementById('root'))`
}

const generateViewScript = async (viewPath: string) => {
  if (generationCache.has(viewPath)) return generationCache.get(viewPath)

  const result = await Bun.build({
    entrypoints: [viewPath],
    outdir: '.hyri',
    external: ['hyri-preact'],
    splitting: true,
  })

  const viewScriptPath = result.outputs[0].path
  const viewScriptFile = Bun.file(viewScriptPath)
  let viewScript = await viewScriptFile.text()


  const fileName = viewPath.split('/').pop()?.replace('.tsx', '')
  const componentName = viewScript.match(/var (.*)_default =(.*)/)?.pop()?.trim().replace(';', '')
  if (!componentName || !fileName) {
    throw new Error("Could not find component name or file name")
  }

  viewScript = viewScript.replace(`var ${fileName}_default = ${componentName};`, '')
  viewScript = viewScript.replace(`export {`, '')
  viewScript = viewScript.replace(`${fileName}_default as default\n};`, '')

  viewScript = getHydrateImport() + viewScript.trim() + "\n"
  viewScript += getHydrateCall(componentName)

  await Bun.write(
    viewScriptFile,
    viewScript.trim()
  )
}

const updateBuildManifest = async (generatedScript: { route: string, importPath: string }) => {
  const buildManifestPath = `${process.cwd()}/.hyri/buildManifest.json`
  const buildManifestFile = Bun.file(buildManifestPath)
  let buildManifest: BuildManifest = {
    scripts: {}
  }
  if (await buildManifestFile.exists()) {
    buildManifest = await buildManifestFile.json() as typeof buildManifest
  }
  const scriptPath = "/_hyri/" + generatedScript.importPath.split('/').pop() + ".js"
  buildManifest.scripts[generatedScript.route] = scriptPath
  await Bun.write(buildManifestPath, JSON.stringify(buildManifest, null, 2))
}

export {
  generateViewScript,
  updateBuildManifest
}