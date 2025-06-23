import { PrismaClient } from '@prisma/client'
import { ProgramMain } from './program'
import { TeacherMain } from './teacherSubject'
const prisma = new PrismaClient()

async function mainModule() {
  await Promise.all([ProgramMain(prisma), TeacherMain(prisma)])
}

mainModule()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
