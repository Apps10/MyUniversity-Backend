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
    program,
  }: IStudentPrimitive) {
    return new Student(
      id,
      name,
      lastname,
      documentType,
      documentNumber,
      email,
      password,
      program,
    )
  }

  static fromArrayPrimitives(students: IStudentPrimitive[]) {
    return students.map((s) => this.fromPrimitives(s))
  }
}
