import { Student } from '../entities'
import { GenericRepository } from './generic.repository'

export const STUDENT_REPOSITORY = Symbol('StudentRepository')
export interface StudentRepository extends GenericRepository<Student> {
  getStudentsNameInSameSubject(subjectId: string): Promise<string[] | []>
  findByEmail(email: string): Promise<Student | null>
}
