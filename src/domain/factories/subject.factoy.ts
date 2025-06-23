import { ISubjectPrimitive, Subject } from '../entities'

export class SubjectFactory {
  static fromPrimitive({ id, name, credits, teacherData }: ISubjectPrimitive) {
    return new Subject(id, name, credits, teacherData)
  }

  static fromArrayPrimitive(subjects: ISubjectPrimitive[]) {
    return subjects.map((s) => this.fromPrimitive(s))
  }
}
