import { getAllSubjectsUseCase } from '../useCases/getAllSubjects.usecase'

export const SUBJECT_USE_CASE_FACTORY = Symbol('SubjectUseCaseFactory')
export interface SubjectUseCaseFactory {
  getAllSubject(): getAllSubjectsUseCase
}
