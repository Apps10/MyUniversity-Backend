import { StudentUseCaseFactory } from 'src/application/factories/studentUseCase.factory'
import {
  LoginStudentUseCase,
  RegisterStudentUseCase,
} from 'src/application/useCases'
import { ProgramRepository, StudentRepository } from 'src/domain/repositories'
import { HashService, JwtService } from 'src/domain/services'
import { ProgramMockRepository } from '../repositories/programPrisma.repository'

export class StudentUseCaseFactoryImp implements StudentUseCaseFactory {
  programRepo: ProgramRepository = new ProgramMockRepository()

  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly hashSevice: HashService,
    private readonly jwtService: JwtService,
  ) {}

  loginStudent(): LoginStudentUseCase {
    return new LoginStudentUseCase(
      this.studentRepo,
      this.hashSevice,
      this.jwtService,
    )
  }

  registerStudent(): RegisterStudentUseCase {
    return new RegisterStudentUseCase(
      this.studentRepo,
      this.programRepo,
      this.hashSevice,
      this.jwtService,
    )
  }
}
