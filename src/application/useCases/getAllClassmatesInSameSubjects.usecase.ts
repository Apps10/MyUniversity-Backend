import { StudentRepository } from 'src/domain/repositories'
import { GetAllStudentInSameSubjectDto } from '../dtos'
import { StudentNotFoundException } from 'src/domain/exceptions'

export class GetClassmateNameInSameSubjectsUseCase {
  constructor(private readonly studentRepo: StudentRepository) {}

  async execute({ studentId }: GetAllStudentInSameSubjectDto) {
    const student = await this.studentRepo.findById(studentId)

    if (!student) throw new StudentNotFoundException()

    return await this.studentRepo.getClassmateNameInSameSubject(studentId)
  }
}
