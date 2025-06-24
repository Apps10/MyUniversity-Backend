import { GetAllProgramUseCase } from '../useCases'

export const PROGRAM_USE_CASE_FACTORY = Symbol('ProgramUseCaseFactory')
export interface ProgramUseCaseFactory {
  getAllPrograms(): GetAllProgramUseCase
}
