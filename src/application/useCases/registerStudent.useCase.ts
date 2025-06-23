import { RegisterStudentDto } from '../dtos'
import { HashService, JwtService } from 'src/domain/services'
import { ProgramRepository, StudentRepository } from 'src/domain/repositories'
import { StudentFactory } from 'src/domain/factories'
import {
  ProgramNotFoundException,
  StudentAlreadyExistException,
} from 'src/domain/exceptions'

export class RegisterStudentUseCase {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly programRepo: ProgramRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: RegisterStudentDto): Promise<{ token: string }> {
    const studentExist = await this.studentRepo.findByEmail(dto.email)
    const programExist = await this.programRepo.findById(dto.programId)
    if (studentExist) {
      throw new StudentAlreadyExistException()
    }

    if (!programExist) {
      throw new ProgramNotFoundException()
    }

    const hashedPassword = await this.hashService.hashPassword(dto.password)
    const student = StudentFactory.fromPrimitives({
      ...dto,
      password: hashedPassword,
      subjects: [],
      avaliableCredits: programExist.totalCredits,
      programId: dto.programId,
    })

    await this.studentRepo.save(student)

    const { password,...payload } = student
    const token = this.jwtService.sign(payload)

    return { token }
  }
}
