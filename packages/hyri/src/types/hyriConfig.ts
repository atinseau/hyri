import { z } from 'zod'
import { HyriRootComponent } from './render'


export const hyriConfigSchema = z.object({
  port: z.number().default(3000)
})
.catchall(z.any())

export const HyriConfigRequiredSchema = hyriConfigSchema.required()

type HyriConfigBase = {
  views: Record<string, HyriRootComponent>
}

export type HyriConfig = z.infer<typeof hyriConfigSchema> & HyriConfigBase
export type HyriConfigRequired = z.infer<typeof HyriConfigRequiredSchema> & HyriConfigBase