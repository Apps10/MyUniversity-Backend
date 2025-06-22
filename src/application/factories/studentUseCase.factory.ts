import { LoginStudentUseCase, RegisterStudentUseCase } from '../useCases'

export const STUDENT_USE_CASE_FACTORY = Symbol('StudentUseCaseFactory')
export interface StudentUseCaseFactory {
  loginStudent(): LoginStudentUseCase
  registerStudent(): RegisterStudentUseCase
}
