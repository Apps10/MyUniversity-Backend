import { Teacher } from 'src/domain/entities'
import { TeacherFactory } from 'src/domain/factories'
import { TeacherRepository } from 'src/domain/repositories/teacher.repository'
import { PrismaService } from 'src/shared/services/prisma.service'

export class TeacherPrismaRepository implements TeacherRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<[] | Teacher[]> {
    const teachers = await this.prisma.teacher.findMany()
    return TeacherFactory.fromArrayPrimitive(teachers)
  }

  async findById(id: string): Promise<Teacher | null> {
    const t = await this.prisma.teacher.findUnique({ where: { id } })

    if (!t) return null

    return TeacherFactory.fromPrimivites({ ...t })
  }

  save(instance: Teacher): Promise<void> {
    //no implementada porque no se usara de momento
    return Promise.resolve()
  }
}
