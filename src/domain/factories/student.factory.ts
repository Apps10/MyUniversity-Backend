import { IStudentPrimitive, Student } from '../entities'
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
    )
  }

  static fromArrayPrimitives(students: IStudentPrimitive[]): Student[] {
    return students.map((s) => this.fromPrimitives(s))
  }
}
