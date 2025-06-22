import { PrismaService } from 'src/shared/services'
import { StudentRepository } from 'src/domain/repositories'
import { Student } from 'src/domain/entities'
import {
  StudentFactory,
  SubjectFactory,
  TeacherFactory,
} from 'src/domain/factories'

export class StudentPrismaRepository implements StudentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Student[] | []> {
    const students = await this.prisma.student.findMany({
      include: {
        ...this.commonIncludeParamsQuery(),
      },
    })

    if (!students) return []

    return students.map((s) =>
      StudentFactory.fromPrimitives({
        ...s,
        subjects: s.StudentSubject.map((ss) =>
          SubjectFactory.fromPrimitive({
            ...ss.subject,
            teacher: TeacherFactory.fromPrimivites({ ...ss.subject.teacher }),
          }),
        ),
      }),
    )
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.student.findUnique({
      where: {
        email,
      },
      include: {
        ...this.commonIncludeParamsQuery(),
      },
    })

    if (!student) return null

    return StudentFactory.fromPrimitives({
      ...student,
      subjects: student.StudentSubject.map((ss) =>
        SubjectFactory.fromPrimitive({
          ...ss.subject,
          teacher: TeacherFactory.fromPrimivites({ ...ss.subject.teacher }),
        }),
      ),
    })
  }

  async findById(id: string): Promise<Student | null> {
    const student = await this.prisma.student.findUnique({
      include: {
        ...this.commonIncludeParamsQuery(),
      },
      where: { id },
    })

    if (!student) return null

    return StudentFactory.fromPrimitives({
      ...student,
      subjects: student.StudentSubject.map((ss) =>
        SubjectFactory.fromPrimitive({
          ...ss.subject,
          teacher: TeacherFactory.fromPrimivites({ ...ss.subject.teacher }),
        }),
      ),
    })
  }

  async getStudentsNameInSameSubject(
    subjectId: string,
  ): Promise<string[] | []> {
    const studentsName = await this.prisma.student.findMany({
      select: {
        name: true,
      },
      where: {
        StudentSubject: {
          some: {
            subjectId,
          },
        },
      },
    })

    if (studentsName.length === 0) return []

    return studentsName.map((s) => s.name)
  }

  async save(student: Student): Promise<void> {
    const existing = await this.prisma.student.findUnique({
      where: { id: student.id },
    })

    const data = {
      id: student.id,
      name: student.name,
      lastname: student.lastname,
      documentType: student.documentType,
      documentNumber: student.documentNumber,
      email: student.email,
      password: student.password,
      programId: student.programId,
    }

    if (existing) {
      await this.prisma.student.update({
        where: { id: student.id },
        data,
      })
      return
    }

    await this.prisma.student.create({
      data,
    })
  }

  private commonIncludeParamsQuery() {
    return {
      StudentSubject: {
        include: {
          subject: {
            include: {
              teacher: true, // si necesitas el profe en el constructor
            },
          },
        },
      },
    }
  }
}