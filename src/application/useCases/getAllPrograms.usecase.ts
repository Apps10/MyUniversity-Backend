import { ProgramRepository } from 'src/domain/repositories'

export class GetAllProgramUseCase {
  constructor(private readonly programRepo: ProgramRepository) {}

  async execute() {
    return await this.programRepo.findAll()
  }
}
