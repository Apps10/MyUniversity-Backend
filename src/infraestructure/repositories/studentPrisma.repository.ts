import { PrismaService } from 'src/shared/services'
import { StudentRepository } from 'src/domain/repositories'
import { Student } from 'src/domain/entities'
import { StudentFactory } from 'src/domain/factories'
import { availableMemory } from 'node:process'

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
        subjects: s.StudentSubject.map((s) => ({
          id: s.subject.id,
          name: s.subject.name,
          teacherData: {
            id: s.subject.teacherId,
            name: s.subject.name,
          },
        })),
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
      subjects: student.StudentSubject.map((s) => ({
        id: s.subject.id,
        name: s.subject.name,
        teacherData: {
          id: s.subject.teacherId,
          name: s.subject.name,
        },
      })),
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
      subjects: student.StudentSubject.map((s) => ({
        id: s.subject.id,
        name: s.subject.name,
        teacherData: {
          id: s.subject.teacherId,
          name: s.subject.name,
        },
      })),
    })
  }

  async getClassmateNameInSameSubject(studentId: string) {
    const classmateNameWithSubjectName = await this.prisma.subject.findMany({
      where: {
        StudentSubject: {
          some: {
            studentId: studentId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        StudentSubject: {
          select: {
            student: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (classmateNameWithSubjectName.length === 0) return []

    return classmateNameWithSubjectName.map((subject) => ({
      subjectId: subject.id,
      subjectName: subject.name,
      students: subject.StudentSubject.map((s) => ({
        id: s.student.id,
        name: s.student.name,
      })),
    }))
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
      avaliableCredits: student.avaliableCredits,
      StudentSubject: {
        createMany: {
          data: student.subjects.map((s) => ({
            subjectId: s.id,
          })),
          skipDuplicates: true,
        },
      },
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
          subject: true,
          // subject: {
          //   include: {
          //     teacher: true, // si necesitas el profe en el constructor
          //   },
          // },
        },
      },
    }
  }
}
