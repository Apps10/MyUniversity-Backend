import { EnrollStudentToSubjectDto } from '../dtos'
import { StudentRepository, SubjectRepository } from 'src/domain/repositories'
import {
  StudentNotFoundException,
  SubjectNotFoundException,
} from 'src/domain/exceptions'

export class EnrollStudentToSubjectUseCase {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly subjectRepo: SubjectRepository,
  ) {}

  async execute({
    studentId,
    subjectId,
  }: EnrollStudentToSubjectDto): Promise<void> {
    const [student, subject] = await Promise.all([
      this.studentRepo.findById(studentId),
      this.subjectRepo.findById(subjectId),
    ])

    if (!subject) throw new SubjectNotFoundException()
    if (!student) throw new StudentNotFoundException()

    student.enrollNewSubject(subject)

    await this.studentRepo.save(student)
  }
}
