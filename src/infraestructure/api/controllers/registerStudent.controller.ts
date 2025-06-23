import { Body, Controller, Inject, Post } from '@nestjs/common'
import { RegisterStudentHttpDto } from '../http-dtos/registerStudent.http-dto'
import { ApiPaths } from 'src/shared/constants/apiPath'
import {
  AUTH_USE_CASE_FACTORY,
  AuthUseCaseFactory,
} from 'src/application/factories/authUseCase.factory'

@Controller(ApiPaths.Auth)
export class RegisterStudentController {
  constructor(
    @Inject(AUTH_USE_CASE_FACTORY)
    private readonly authUseCases: AuthUseCaseFactory,
  ) {}

  @Post('/register')
  async execute(@Body() dto: RegisterStudentHttpDto) {
    const usecase = this.authUseCases.registerStudent()

    return await usecase.execute({ ...dto })
  }
}
