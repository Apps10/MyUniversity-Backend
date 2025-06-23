import { PrismaService } from 'src/shared/services/prisma.service'
import { SubjectRepository } from 'src/domain/repositories'
import { Subject } from 'src/domain/entities'
import { SubjectFactory } from 'src/domain/factories'

export class SubjectPrismaRepository implements SubjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<[] | Subject[]> {
    const subjects = await this.prisma.subject.findMany({
      include: {
        teacher: true,
      },
    })
    if (subjects.length === 0) return []

    return SubjectFactory.fromArrayPrimitive(
      subjects.map((s) => ({
        id: s.id,
        name: s.name,
        teacherData: {
          id: s.teacher.id,
          name: s.teacher.name,
        },
      })),
    )
  }

  async findById(id: string): Promise<Subject | null> {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
      include: {
        teacher: true,
      },
    })

    if (!subject) return null

    return SubjectFactory.fromPrimitive({
      id: subject.id,
      name: subject.name,
      teacherData: {
        id: subject.teacher.id,
        name: subject.teacher.name,
      },
    })
  }

  save(instance: Subject): Promise<void> {
    // no se usa por el momento
    return Promise.resolve()
  }
}
