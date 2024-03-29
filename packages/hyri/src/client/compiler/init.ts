const createClientProcess = async () => {

  const clientFile = 'compile.ts'
  const serverProcess = Bun.spawn(['bun', '--hot', 'run', import.meta.dir + '/' + clientFile], {
    env: {
      FORCE_COLOR: '1',
    }
  })

  for await (const chunk of serverProcess.stdout) {
    Bun.write(Bun.stdout, new TextDecoder().decode(chunk))
  }
}

export {
  createClientProcess
}