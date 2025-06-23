import { IStudentPrimitive, Student } from '../entities'
import { SubjectFactory } from './subject.factoy'
export class StudentFactory {
  static fromPrimitives({
    id,
    documentNumber,
    documentType,
    email,
    lastname,
    name,
    password,
    programId,
    avaliableCredits,
    subjects,
  }: IStudentPrimitive): Student {
    return new Student(
      id,
      name,
      lastname,
      documentType,
      documentNumber,
      email,
      password,
      programId,
      avaliableCredits,
      SubjectFactory.fromArrayPrimitive(subjects ?? []),
    )
  }

  static fromArrayPrimitives(students: IStudentPrimitive[]): Student[] {
    return students.map((s) => this.fromPrimitives(s))
  }
}
