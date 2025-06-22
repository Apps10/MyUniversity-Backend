import { Program } from 'src/domain/entities'
import { ProgramFactory } from 'src/domain/factories/program.factory'
import { ProgramRepository } from 'src/domain/repositories'
import { PrismaService } from 'src/shared/services'

export class ProgramPrismaRepository implements ProgramRepository {
  // programs: IProgramPrimitive[] = [
  //   {
  //     id: 'fde5da73-289a-4e1b-bcdd-6f00759e80d6',
  //     name: 'Ingenieria de sistemas',
  //     totalCredits: 9,
  //   },
  //   {
  //     id: '8c9c589b-a16c-4bcc-ae7b-a1674acbbb88',
  //     name: 'Ingenieria Electronica',
  //     totalCredits: 9,
  //   },
  // ] //mock de filas de bd

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
