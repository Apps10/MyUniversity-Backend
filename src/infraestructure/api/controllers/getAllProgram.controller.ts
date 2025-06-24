import { Controller, Get, Inject } from '@nestjs/common'
import {
  PROGRAM_USE_CASE_FACTORY,
  ProgramUseCaseFactory,
} from 'src/application/factories/programUseCase.factory'
import { ApiPaths } from 'src/shared/constants/apiPath'

@Controller(ApiPaths.Program)
export class GetAllProgramController {
  constructor(
    @Inject(PROGRAM_USE_CASE_FACTORY)
    private readonly programUseCases: ProgramUseCaseFactory,
  ) {}

  @Get('/')
  async run() {
    const useCase = this.programUseCases.getAllPrograms()
    return await useCase.execute()
  }
}
