import { LoginStudentUseCase, RegisterStudentUseCase } from '../useCases'

export const AUTH_USE_CASE_FACTORY = Symbol('AuthUseCaseFactory')
export interface AuthUseCaseFactory {
  loginStudent(): LoginStudentUseCase
  registerStudent(): RegisterStudentUseCase
}
