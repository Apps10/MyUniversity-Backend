import { EnrollStudentToSubjectUseCase } from '../useCases'
import { GetClassmateNameInSameSubjectsUseCase } from '../useCases/getAllClassmatesInSameSubjects.usecase'

export const STUDENT_USE_CASE_FACTORY = Symbol('StudentUseCaseFactory')
export interface StudentUseCaseFactory {
  enrollStudentToSubject(): EnrollStudentToSubjectUseCase
  getClassmateNameInSameSubjects(): GetClassmateNameInSameSubjectsUseCase
}
