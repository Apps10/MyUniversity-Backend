interface TeacherData {
  id: string
  name: string
}
export interface ISubjectPrimitive {
  id: string
  name: string
  teacher: TeacherData
  credits?: number
}

export class Subject {
  constructor(
    public readonly id: string,
    public name: string,
    public credits: number = 3,
    public teacher: TeacherData,
  ) {
    this.ensureIsValid()
  }

  private ensureIsValid() {
    const idRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (!idRegex.test(this.id)) {
      throw new Error('id should be an UUID')
    }

    if (
      (this.name.length < 2 && this.name.length > 30) ||
      typeof this.name != 'string'
    ) {
      throw new Error('name must be a string between 2 and 30 characters')
    }

    if (this.credits === 3) {
      throw new Error('each subject must be 3 credits.')
    }
  }
}
