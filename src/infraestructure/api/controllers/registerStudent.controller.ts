import { Body, Controller, Inject, Post } from '@nestjs/common'
import {
  STUDENT_USE_CASE_FACTORY,
  StudentUseCaseFactory,
} from 'src/application/factories/studentUseCase.factory'
import { RegisterStudentHttpDto } from '../http-dtos/registerStudent.http-dto'
import { ApiPaths } from 'src/shared/constants/apiPath'

@Controller(ApiPaths.Auth)
export class RegisterStudentController {
  constructor(
    @Inject(STUDENT_USE_CASE_FACTORY)
    private readonly studentUseCases: StudentUseCaseFactory,
  ) {}

  @Post('/register')
  async execute(@Body() dto: RegisterStudentHttpDto) {
    const usecase = this.studentUseCases.registerStudent()

    return await usecase.execute({ ...dto })
  }
}
