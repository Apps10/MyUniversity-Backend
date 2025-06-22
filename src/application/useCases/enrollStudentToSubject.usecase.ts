import { LoggerService } from 'src/domain/services'
import { EnrollStudentToSubjectDto } from '../dtos'
import { StudentRepository, SubjectRepository } from 'src/domain/repositories'
import {
  StudentCantEnrollSubjectException,
  StudentNotFoundException,
  SubjectAlreadyHasRegisteredTeacherException,
  SubjectNotFoundException,
  InternalServerErrorException,
} from 'src/domain/exceptions'

export class EnrollStudentToSubjectUseCase {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly subjectRepo: SubjectRepository,
    private readonly loggerService: LoggerService,
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

    try {
      student.enrollNewSubject(subject)
    } catch (error) {
      if (
        error instanceof StudentCantEnrollSubjectException ||
        error instanceof SubjectAlreadyHasRegisteredTeacherException
      ) {
        throw error
      }
      this.loggerService.error('error in enroll subject', error)
      throw new InternalServerErrorException()
    }

    await this.studentRepo.save(student)
  }
}
