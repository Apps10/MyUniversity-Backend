import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiPaths } from '../../../shared/constants/apiPath'
import { LoginStudentHttpDto } from '../http-dtos/loginStudent.http-dto'
import {
  STUDENT_USE_CASE_FACTORY,
  StudentUseCaseFactory,
} from 'src/application/factories/studentUseCase.factory'

@Controller(ApiPaths.Auth)
export class LoginStudentController {
  constructor(
    @Inject(STUDENT_USE_CASE_FACTORY)
    private readonly studentUseCases: StudentUseCaseFactory,
  ) {}

  @Post('/login')
  async execute(@Body() dto: LoginStudentHttpDto) {
    const usecase = this.studentUseCases.loginStudent()
    return await usecase.execute(dto.email, dto.password)
  }
}
