import { Program } from 'src/domain/entities'
import { ProgramFactory } from 'src/domain/factories/program.factory'
import { ProgramRepository } from 'src/domain/repositories'
import { PrismaService } from 'src/shared/services/prisma.service'

export class ProgramPrismaRepository implements ProgramRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<[] | Program[]> {
    const programs = await this.prisma.program.findMany()
    return ProgramFactory.fromArrayPrimitive(programs)
  }

  async findById(id: string): Promise<Program | null> {
    const program = await this.prisma.program.findUnique({
      where: { id },
    })
    if (!program) return null

    return ProgramFactory.fromPrimitives(program)
  }

  async save(_: Program): Promise<void> {
    return Promise.resolve()
  }
}
