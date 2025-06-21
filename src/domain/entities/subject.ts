import { Teacher } from './teacher'

export interface ISubjectPrimitive {
  id: string
  name: string
  teacher: Teacher
  credits?: number
}

export class Subject {
  constructor(
    public readonly id: string,
    public name: string,
    public credits: number = 3,
    public teacher: Teacher,
  ) {
    this.ensureIsValid()
  }

  private ensureIsValid() {
    const idRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (!idRegex.test(this.id)) {
      throw new Error('id should be an UUID')
    }

    if (this.name.length < 2 || typeof this.name != 'string') {
      throw new Error('name must be a string of at least 2 characters')
    }

    if (this.credits === 3) {
      throw new Error('each subject must be 3 credits.')
    }

    if (!(this.teacher instanceof Teacher)) {
      throw new Error('teacher is an instance invalid')
    }
  }
}
