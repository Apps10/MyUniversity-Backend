import { RegisterStudentDto } from '../dtos'
import { StudentAlreadyExistException } from 'src/domain/exceptions'
import { HashService, JwtService } from 'src/domain/services'
import { StudentRepository } from 'src/domain/repositories'
import { StudentFactory } from 'src/domain/factories'

export class RegisterStudentUseCase {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: RegisterStudentDto): Promise<{ token: string }> {
    const studentExist = await this.studentRepo.findByEmail(dto.email)

    if (studentExist) {
      throw new StudentAlreadyExistException()
    }

    const hashedPassword = await this.hashService.hashPassword(dto.password)
    const student = StudentFactory.fromPrimitives({
      ...dto,
      password: hashedPassword,
    })

    await this.studentRepo.save(student)

    const { password, ...payload } = dto
    const token = this.jwtService.sign(payload)

    return { token }
  }
}
