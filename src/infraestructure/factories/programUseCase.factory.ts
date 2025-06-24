import { ProgramUseCaseFactory } from 'src/application/factories/programUseCase.factory'
import { GetAllProgramUseCase } from 'src/application/useCases'
import { ProgramRepository } from 'src/domain/repositories'

export class ProgramUseCaseFactoryImp implements ProgramUseCaseFactory {
  constructor(private readonly programRepo: ProgramRepository) {}

  getAllPrograms(): GetAllProgramUseCase {
    return new GetAllProgramUseCase(this.programRepo)
  }
}
