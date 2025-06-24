import { RegisterStudentDto } from '../dtos'
import { HashService, JwtService } from 'src/domain/services'
import { ProgramRepository, StudentRepository } from 'src/domain/repositories'
import { StudentFactory } from 'src/domain/factories'
import {
  ProgramNotFoundException,
  StudentAlreadyExistException,
} from 'src/domain/exceptions'
import { IStudentPrimitive } from 'src/domain/entities'
import { AuthResponse } from 'src/domain/interface/AuthResponse.interface'

export class RegisterStudentUseCase {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly programRepo: ProgramRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: RegisterStudentDto): Promise<{
    token: string
    user: AuthResponse
  }> {
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

    const { password: _p, subjects, ...obj } = student
    const token = this.jwtService.sign(obj)

    return { token, user: { ...obj } }
  }
}
