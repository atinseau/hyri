
type HyriProcess = {
  entryPoint: string
  mode: HyriCommand
  onStarted?: () => void
}

function waitForStdout(reader: ReadableStreamDefaultReader<any>, onFirstLine: () => void) {
  let isFirstLine = true
  return new Promise(async (resolve) => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      console.write(value);
      if (isFirstLine) {
        onFirstLine()
        isFirstLine = false
      }
    }
    resolve()
  }) as Promise<void>
}

function spawnMode(mode: HyriCommand) {
  switch (mode) {
    case 'dev':
      return ['--hot']
    case 'build':
      return []
    case 'start':
      return []
    default:
      throw new Error('Invalid mode')
  }
}

function createHyriProcess(hyriProcess: HyriProcess) {
  const { entryPoint } = hyriProcess
  const spawnArgs = spawnMode(hyriProcess.mode)
  const proc = Bun.spawn(["bun", ...spawnArgs, entryPoint]);
  if (!proc.stdout) {
    throw new Error('No stdout in process')
  }
  waitForStdout(proc.stdout.getReader(), () => {
    if (hyriProcess.onStarted) {
      hyriProcess.onStarted()
    }
  })
}

export {
  createHyriProcess
}