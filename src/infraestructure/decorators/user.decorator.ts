import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Student } from 'src/domain/entities'

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Student => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user as Student

    if (!user) {
      throw new Error('missing user in request, forgot call jwtAuthGuard?')
    }

    return user
  },
)
