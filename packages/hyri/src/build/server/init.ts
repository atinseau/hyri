import { HyriConfigRequired } from "../../types/hyriConfig"

const createServerProcess = async (hyriConfig: HyriConfigRequired) => {

  console.log(hyriConfig)

  const serverFile = 'process.ts'
  const serverProcess = Bun.spawn(['bun', '--hot', 'run', import.meta.dir + '/' + serverFile], {
    env: {
      FORCE_COLOR: '1',
    }
  })

  for await (const chunk of serverProcess.stdout) {
    Bun.write(Bun.stdout, new TextDecoder().decode(chunk))
  }
}

export {
  createServerProcess
}