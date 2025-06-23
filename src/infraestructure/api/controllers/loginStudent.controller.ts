import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiPaths } from '../../../shared/constants/apiPath'
import { LoginStudentHttpDto } from '../http-dtos'
import {
  AUTH_USE_CASE_FACTORY,
  AuthUseCaseFactory,
} from 'src/application/factories'

@Controller(ApiPaths.Auth)
export class LoginStudentController {
  constructor(
    @Inject(AUTH_USE_CASE_FACTORY)
    private readonly authUseCases: AuthUseCaseFactory,
  ) {}

  @Post('/login')
  async execute(@Body() dto: LoginStudentHttpDto) {
    const usecase = this.authUseCases.loginStudent()
    return await usecase.execute(dto.email, dto.password)
  }
}
