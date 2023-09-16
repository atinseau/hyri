import getAppMode from "../utils/command"

const createServerProcess = async () => {
  const serverFile = 'server.ts'
  const appMode = getAppMode()

  const serverProcess = Bun.spawn([
    'bun',
    '--hot',
    ...appMode === 'debug' ? ['--inspect'] : [],
    'run',
    import.meta.dir + '/' + serverFile
  ], {
    env: {
      FORCE_COLOR: '1',
      APP_MODE: appMode
    }
  })

  for await (const chunk of serverProcess.stdout) {
    Bun.write(Bun.stdout, new TextDecoder().decode(chunk))
  }
}

export {
  createServerProcess
}