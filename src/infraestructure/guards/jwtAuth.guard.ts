import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { JWT_SERVICE, JwtService } from 'src/domain/services'

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(JWT_SERVICE) private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest()

    const authHeader = request.headers['authorization']
    if (!authHeader || !authHeader.startsWith('')) {
      throw new UnauthorizedException('token missing')
    }

    const token = authHeader.split(' ')[1]
    try {
      const payload = this.jwtService.verify(token)
      request['user'] = payload
      return true
    } catch (_) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
