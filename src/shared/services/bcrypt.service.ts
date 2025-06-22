import * as bcrypt from 'bcryptjs'

export class BcryptService {
  constructor() {}

  async hash(string: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(string, salt)
  }

  async compare(stringHashed: string, string: string): Promise<boolean> {
    return bcrypt.compare(string, stringHashed)
  }
}
