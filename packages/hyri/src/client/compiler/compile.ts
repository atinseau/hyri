import { getHyriConfig } from "../../utils/config"
import print from "../../utils/log"
import getViewFromFile from "../../utils/parser/getViewFromFile"
import getFileImports from "../../utils/parser/getViewImport"
import { generateViewScript, updateBuildManifest } from "./scriptGenerator"

try {
  const hyriConfig = await getHyriConfig()

  const hyriConfigPath = `${process.cwd()}/hyri.config.ts`

  const hyriConfigFile = Bun.file(hyriConfigPath)
  const hyriConfigContent = await hyriConfigFile.text()

  const imports = getFileImports(hyriConfigContent)
  const views = getViewFromFile(hyriConfigContent)

  // iterate over views to generate the script
  for (const [route, view] of Object.entries(views)) {
    const pathOfView = imports?.find((fileImport) => fileImport.defaultExport === view)
    if (!pathOfView) {
      print.error(`Could not find view ${view}`)
      process.exit(1)
    }

    generateViewScript(pathOfView.importPath).then(async () => {
      await updateBuildManifest({
        route,
        importPath: pathOfView.importPath
      })
    })
  }

} catch (e) {
  print.error((e as Error)?.message || "An error occured")
  process.exit(1)
}