import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
  PORT: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val), { message: 'PORT must be a number in ENV' }),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
})

type EnvVars = z.infer<typeof envSchema>

class Envs {
  private static envs: EnvVars

  private constructor() {}

  static getInstance(): EnvVars {
    if (!this.envs) {
      const result = envSchema.safeParse(process.env)
      if (!result.success) {
        console.error(
          '❌ Invalid environment variables:',
          result.error.format(),
        )
        throw new Error('Invalid environment variables')
      }
      this.envs = result.data
    }

    return this.envs
  }
}

export const { JWT_SECRET, PORT } = Envs.getInstance()
