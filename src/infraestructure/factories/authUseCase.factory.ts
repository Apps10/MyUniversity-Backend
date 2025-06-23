import { AuthUseCaseFactory } from 'src/application/factories'
import {
  LoginStudentUseCase,
  RegisterStudentUseCase,
} from 'src/application/useCases'
import { ProgramRepository, StudentRepository } from 'src/domain/repositories'
import { HashService, JwtService } from 'src/domain/services'

export class AuthUseCaseFactoryImp implements AuthUseCaseFactory {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly programRepo: ProgramRepository,
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
