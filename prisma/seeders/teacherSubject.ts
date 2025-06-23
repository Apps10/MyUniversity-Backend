import { ISubjectPrimitive, ITeacherPrimitive } from 'src/domain/entities'

const subjects: Omit<ISubjectPrimitive, 'teacherData'>[] = [
  { id: 'f14aca3d-7a33-4b9d-afaa-c7857ab4461d', name: 'Matematicas Discretas' },
  { id: '2380d00d-d3f3-44b9-8182-0cf4dade2894', name: 'Sistemas Operativos' },
  { id: '238e6c06-2ea5-4de1-8b21-599a7e52af84', name: 'Calculo Diferencial' },
  { id: '4a2ee5c5-02f9-4f6a-94bb-693968642589', name: 'Calculo Vectorial' },
  { id: 'edebea60-4b9b-434d-a2b3-f4f400033401', name: 'Termo Dinamica' },
  { id: '5f5686ba-7cb7-435f-9bae-6a4f65f3def8', name: 'Algebra lineal' },
  { id: 'd0a1ccb8-6383-4e45-b920-223c4e715209', name: 'Microcontroladores' },
  {
    id: '553e7783-c3a1-443b-9b6d-fb57aed95a7d',
    name: 'Electronica Analogica y Digital',
  },
  { id: '71d7be95-bcf9-4a5b-a68d-3b4388b70e83', name: 'Algoritmo' },
  { id: '30716206-a869-4876-b505-b9aba0f57662', name: 'Estuctura de Datos' },
]

const teachers: (Omit<ITeacherPrimitive, 'subjects'> & {
  subjects?: Omit<ISubjectPrimitive, 'teacherData'>[]
})[] = [
  {
    id: '25499e3a-7f82-4342-8e18-757ebf2c5195',
    name: 'Ivan Contreras',
    subjects: [{ ...subjects[0] }, { ...subjects[1] }],
  },
  {
    id: 'a28b6620-daa7-4e0d-bc09-66de3b1c034c',
    name: 'Francisco Molina',
    subjects: [{ ...subjects[2] }, { ...subjects[3] }],
  },
  {
    id: '9e952356-1479-4203-9b36-245e75fd0063',
    name: 'Carlos Castro',
    subjects: [{ ...subjects[4] }, { ...subjects[5] }],
  },
  {
    id: '18fc64b4-fbb1-46cf-89a6-df9cd8beb5d8',
    name: 'Marlon Vergara',
    subjects: [{ ...subjects[6] }, { ...subjects[7] }],
  },
  {
    id: 'ee94ee9e-f372-4f7e-a358-5685b92fcfb5',
    name: 'Sergio Ramos',
    subjects: [{ ...subjects[8] }, { ...subjects[9] }],
  },
]

export async function TeacherMain(prisma: any) {
  console.log(`enviando seeder de TEACHER`)
  const promiseArray: Promise<any>[] = []

  teachers.forEach((t) => {
    const promiseT = prisma.teacher.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        name: t.name,
        subjects: {
          createMany: {
            data:
              t.subjects?.map((s) => ({
                id: s.id,
                name: s.name,
                credits: s.credits ?? 3,
              })) ?? [],
          },
        },
      },
    })
    promiseArray.push(promiseT)
  })

  await Promise.all(promiseArray)

  console.log(`ejecutados correctamente`)
}
