export const HASH_SERVICE = Symbol('HashService')

export interface HashService {
  hashPassword(password: string): Promise<string>
  comparePassword(password: string, hashedPassword: string): Promise<boolean>
}
