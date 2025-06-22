import { ITeacherPrimitive, Teacher } from '../entities'
import { SubjectFactory } from './subject.factoy'

export class TeacherFactory {
  static fromPrimivites({ id, name, subjects = [] }: ITeacherPrimitive) {
    return new Teacher(id, name, SubjectFactory.fromArrayPrimitive(subjects))
  }

  static fromArrayPrimitive(teachers: ITeacherPrimitive[]) {
    return teachers.map((t) => this.fromPrimivites(t))
  }
}
