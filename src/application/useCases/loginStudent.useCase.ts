import { IStudentPrimitive, Student } from 'src/domain/entities'
import { StudentUnAuthorizedException } from 'src/domain/exceptions'
import { AuthResponse } from 'src/domain/interface/AuthResponse.interface'
import { StudentRepository } from 'src/domain/repositories'
import { HashService, JwtService } from 'src/domain/services'

export class LoginStudentUseCase {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{
    token: string
    user: AuthResponse
  }> {
    const student = await this.studentRepo.findByEmail(email)
    if (
      !student ||
      !(await this.hashService.comparePassword(password, student.password))
    ) {
      throw new StudentUnAuthorizedException()
    }

    const { password: _p, subjects, programId, ...obj } = student
    const token = this.jwtService.sign(obj)
    return { token, user: { ...obj } }
  }
}
