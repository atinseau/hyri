import print from "../utils/log"

type GlobalContext = {
  executionPath: string
  startMode: "dev" | "build" | "start"
}

let globalContext = {} as GlobalContext

async function initGlobalContext() {
  globalContext.executionPath = process.cwd()
  const cleanedArgs = process.argv.slice(2)
  const startMode = cleanedArgs[0]
  if (!startMode) {
    print.error('No start mode provided (dev, build or start)')
    process.exit(1)
  }
  if (
    startMode !== 'dev'
    && startMode !== 'build'
    && startMode !== 'start'
  ) {
    print.error('Invalid start mode provided (dev, build or start)')
    process.exit(1)
  }
  globalContext.startMode = startMode
  return globalContext
}

export {
  initGlobalContext,
}

export default globalContext