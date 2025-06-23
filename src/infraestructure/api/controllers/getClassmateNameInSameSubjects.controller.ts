import { Controller, Get, Inject, UseGuards } from '@nestjs/common'
import {
  STUDENT_USE_CASE_FACTORY,
  StudentUseCaseFactory,
} from 'src/application/factories'
import { Student } from 'src/domain/entities'
import { UserDecorator } from 'src/infraestructure/decorators'
import { JwtAuthGuard } from 'src/infraestructure/guards'
import { ApiPaths } from 'src/shared/constants/apiPath'

@Controller(ApiPaths.Student)
export class GetClassmateNameInSameSubjectController {
  constructor(
    @Inject(STUDENT_USE_CASE_FACTORY)
    private readonly studentUseCasesFactory: StudentUseCaseFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(`/classmate`)
  async run(@UserDecorator() { id: studentId }: Student) {
    const usecase = this.studentUseCasesFactory.getClassmateNameInSameSubjects()
    return await usecase.execute({ studentId })
  }
}
