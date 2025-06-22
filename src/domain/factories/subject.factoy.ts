import { ISubjectPrimitive, Subject } from '../entities'

export class SubjectFactory {
  static fromPrimitive(primitive: ISubjectPrimitive) {
    return new Subject(
      primitive.id,
      primitive.name,
      primitive.credits,
      primitive.teacher,
    )
  }

  static fromArrayPrimitive(subjects: ISubjectPrimitive[]) {
    return subjects.map((s) => this.fromPrimitive(s))
  }
}
