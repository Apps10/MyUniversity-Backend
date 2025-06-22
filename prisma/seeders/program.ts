import { IProgramPrimitive } from 'src/domain/entities'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()
const programs: IProgramPrimitive[] = [
  {
    id: 'fde5da73-289a-4e1b-bcdd-6f00759e80d6',
    name: 'Ingenieria de sistemas',
  },
  {
    id: '8c9c589b-a16c-4bcc-ae7b-a1674acbbb88',
    name: 'Ingenieria Electronica',
  },
]

export async function ProgramMain() {
  console.log(`enviando seeder de PROGRAM`)
  const promiseArray: Promise<any>[] = []

  programs.forEach((p) => {
    const promiseT = prisma.program.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        totalCredits: 9,
      },
    })

    promiseArray.push(promiseT)
  })

  await Promise.all(promiseArray)

  console.log(`ejecutados correctamente`)
}
ProgramMain()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
