import { HashService } from 'src/domain/services'
import { BcryptService } from 'src/shared/services'

export class BcryptHashServiceAdapter implements HashService {
  constructor(private readonly bcryptService: BcryptService) {}

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return this.bcryptService.compare(hashedPassword, password)
  }

  hashPassword(password: string): Promise<string> {
    return this.bcryptService.hash(password)
  }
}
