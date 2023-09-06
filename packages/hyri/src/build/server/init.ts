import configContext from "../../context/configContext";
import globalContext from "../../context/globalContext";

const createServerProcess = async () => {
  const serverFile = 'serverProcess.ts'
  const serverProcess = Bun.spawn(['bun', '--hot', 'run', import.meta.dir + '/' + serverFile], {
    env: {
      FORCE_COLOR: '1',
      GLOBAL_CONTEXT: JSON.stringify(globalContext),
      CONFIG_CONTEXT: JSON.stringify(configContext)
    }
  })

  for await (const chunk of serverProcess.stdout) {
    Bun.write(Bun.stdout, new TextDecoder().decode(chunk))
  }
}

const injectContext = () => {
  const envConfigContext = process.env.CONFIG_CONTEXT
  const envGlobalContext = process.env.GLOBAL_CONTEXT

  if (!envConfigContext || !envGlobalContext) {
    throw new Error('No context found, please use the hyri cli to start your application')
  }

  const jsonConfigContext = JSON.parse(envConfigContext)
  const jsonGlobalContext = JSON.parse(envGlobalContext)

  globalContext.executionPath = jsonGlobalContext.executionPath
  globalContext.startMode = jsonGlobalContext.startMode
  configContext.hyriConfig = jsonConfigContext.hyriConfig
  configContext.packageJson = jsonConfigContext.packageJson
}

export {
  injectContext,
  createServerProcess
}