import { SubjectUseCaseFactory } from 'src/application/factories/subjectUseCase.factory'
import { getAllSubjectsUseCase } from 'src/application/useCases/getAllSubjects.usecase'
import { SubjectRepository } from 'src/domain/repositories'

export class SubjectUseCaseFactoryImp implements SubjectUseCaseFactory {
  constructor(private readonly subjectRepo: SubjectRepository) {}

  getAllSubject(): getAllSubjectsUseCase {
    return new getAllSubjectsUseCase(this.subjectRepo)
  }
}
