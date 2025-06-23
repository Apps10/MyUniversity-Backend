import { Controller, Get, Inject, UseGuards } from '@nestjs/common'
import {
  SUBJECT_USE_CASE_FACTORY,
  SubjectUseCaseFactory,
} from 'src/application/factories/subjectUseCase.factory'
import { JwtAuthGuard } from 'src/infraestructure/guards'
import { ApiPaths } from 'src/shared/constants/apiPath'

@Controller(ApiPaths.Subject)
export class GetAllSubjectController {
  constructor(
    @Inject(SUBJECT_USE_CASE_FACTORY)
    private readonly subjectUseCases: SubjectUseCaseFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async run() {
    const useCase = this.subjectUseCases.getAllSubject()
    return await useCase.execute()
  }
}
