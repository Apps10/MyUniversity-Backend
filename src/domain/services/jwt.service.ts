import { JwtPayload } from 'src/application/interfaces/jwt.interface'
export const JWT_SERVICE = Symbol('JwtService')

export interface JwtService {
  sign(payload: JwtPayload): string
  verify(token: string): JwtPayload
}
