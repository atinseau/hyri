import { z } from 'zod'


export const hyriConfigSchema = z.object({
  pagesDir: z.string().optional()
})

export const HyriConfigRequiredSchema = hyriConfigSchema.required()


export type HyriConfig = z.infer<typeof hyriConfigSchema>
export type HyriConfigRequired = z.infer<typeof HyriConfigRequiredSchema>