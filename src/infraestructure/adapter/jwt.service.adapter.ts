import { JwtService as NestJwtService } from '@nestjs/jwt'
import { JwtPayload } from 'src/application/interfaces'
import { JwtService } from 'src/domain/services'

export class JwtServiceAdapter implements JwtService {
  constructor(private readonly jwt: NestJwtService) {}

  sign(payload: JwtPayload): string {
    return this.jwt.sign(payload)
  }

  verify(token: string): JwtPayload {
    return this.jwt.verify(token)
  }
}
