import { SubjectRepository } from 'src/domain/repositories'
import { SubjectMapperImp } from '../mappers/subjectMapper'

export class getAllSubjectsUseCase {
  constructor(private readonly subjectRepo: SubjectRepository) {}

  async execute() {
    const subjects = await this.subjectRepo.findAll()
    return SubjectMapperImp.toApiJSONArray(subjects)
  }
}
