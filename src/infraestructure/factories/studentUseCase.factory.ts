import { Logger } from '@nestjs/common'
import { StudentUseCaseFactory } from 'src/application/factories/studentUseCase.factory'
import { EnrollStudentToSubjectUseCase } from 'src/application/useCases/enrollStudentToSubject.usecase'
import { GetClassmateNameInSameSubjectsUseCase } from 'src/application/useCases/getAllClassmatesInSameSubjects.usecase'
import { StudentRepository, SubjectRepository } from 'src/domain/repositories'

export class StudentUseCaseFactoryImp implements StudentUseCaseFactory {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly subjectRepo: SubjectRepository,
  ) {}

  enrollStudentToSubject(): EnrollStudentToSubjectUseCase {
    return new EnrollStudentToSubjectUseCase(this.studentRepo, this.subjectRepo)
  }

  getClassmateNameInSameSubjects(): GetClassmateNameInSameSubjectsUseCase {
    return new GetClassmateNameInSameSubjectsUseCase(this.studentRepo)
  }

  private loggerService(Logger: Logger) {
    return {
      error: (title, message) => Logger.error(title, message),
      log: (title, message) => Logger.log(title, message),
    }
  }
}
