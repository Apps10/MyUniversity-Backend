import { Student } from '../entities'
import { GenericRepository } from './generic.repository'

export interface StudentRepository extends GenericRepository<Student> {
  getStudentsInSameSubject(subject: any): Promise<Student[] | []>
  findByEmail(email: string): Promise<Student | null>
}
