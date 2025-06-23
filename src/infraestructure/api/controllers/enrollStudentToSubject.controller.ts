import {
  Controller,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { StudentUseCaseFactory } from 'src/application/factories'
import { ApiPaths } from 'src/shared/constants/apiPath'
import { STUDENT_USE_CASE_FACTORY } from 'src/application/factories'
import { JwtAuthGuard } from 'src/infraestructure/guards'
import { UserDecorator } from 'src/infraestructure/decorators'
import { Student } from 'src/domain/entities'

@Controller(ApiPaths.Student)
export class EnrollStudentToSubjectController {
  constructor(
    @Inject(STUDENT_USE_CASE_FACTORY)
    private readonly studentUseCases: StudentUseCaseFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/enroll/:subjectId')
  @HttpCode(204)
  async execute(
    @UserDecorator() student: Student,
    @Param('subjectId', ParseUUIDPipe) subjectId: string,
  ) {
    const usecase = this.studentUseCases.enrollStudentToSubject()
    return await usecase.execute({ studentId: student.id, subjectId })
  }
}
