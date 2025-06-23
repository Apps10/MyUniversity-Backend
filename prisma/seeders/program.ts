import { IProgramPrimitive } from 'src/domain/entities'

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
export async function ProgramMain(prisma: any) {
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
