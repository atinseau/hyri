import { z } from "zod";

const HyriConfigSchema = z.object({
  command: z.enum(['dev', 'build', 'start'], {
    errorMap: (_, ctx) => ({
      message: `Invalid command "${ctx.data}" provided, must be one of "dev", "build" or "start"`,
    })
  })
})

function getHyriConfig() {
  const argv = process.argv.slice(2)

  const config = {
    command: argv[0]
  }

  const safeConfig = HyriConfigSchema.safeParse(config)

  if (!safeConfig.success) {
    const { errors } = safeConfig.error
    for (const error of errors) {
      throw new Error(error.message)
    }
  }

  return config as MinimalHyriConfig
}

export {
  getHyriConfig
}