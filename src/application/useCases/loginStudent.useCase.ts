import { Student } from 'src/domain/entities'
import { StudentUnAuthorizedException } from 'src/domain/exceptions'
import { StudentRepository } from 'src/domain/repositories'
import { HashService, JwtService } from 'src/domain/services'

export class LoginStudentUseCase {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const student = await this.studentRepo.findByEmail(email)
    if (
      !student ||
      !(await this.hashService.comparePassword(password, student.password))
    ) {
      throw new StudentUnAuthorizedException()
    }

    const { password: _p, ...obj } = student as Student
    const token = this.jwtService.sign({
      ...obj,
    })
    return { token }
  }
}
