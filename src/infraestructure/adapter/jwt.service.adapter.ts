import { JwtService as NestJwtService } from '@nestjs/jwt'
import { JwtPayload } from 'src/application/interfaces'
import { JwtService } from 'src/domain/services'

export class JwtServiceAdapter implements JwtService {
  constructor(private readonly jwt: NestJwtService) {}

  sign({
    avaliableCredits,
    documentNumber,
    documentType,
    email,
    id,
    lastname,
    name,
  }: JwtPayload): string {
    return this.jwt.sign({
      avaliableCredits,
      documentNumber,
      documentType,
      email,
      id,
      lastname,
      name,
    })
  }

  verify(token: string): JwtPayload {
    return this.jwt.verify(token)
  }
}
