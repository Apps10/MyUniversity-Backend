import { Subject, ISubjectPrimitive } from 'src/domain/entities'

export class SubjectMapperImp {
  static toArrayPrimitive(entities: Subject[]): ISubjectPrimitive[] {
    return entities.map((e) => this.toPrimitive(e))
  }

  static toPrimitive(entity: Subject): ISubjectPrimitive {
    return {
      ...entity,
      teacherData: { ...entity.teacher },
    }
  }

  static toApiJSONArray(entities: Subject[]) {
    return entities.map((e) => this.toApiJSON(e))
  }

  static toApiJSON({ teacher, ...obj }: Subject) {
    return {
      ...obj,
      teacher: { ...teacher },
    }
  }
}
