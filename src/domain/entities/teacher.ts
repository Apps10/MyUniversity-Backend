import { Subject } from './subject'

export class Teacher {
  constructor(
    public readonly id: string,
    public name: string,
    public subjects: Subject[] = [],
  ) {
    this.ensureIsValid()
    this.ensureMaxSubjects()
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
  }

  private ensureMaxSubjects() {
    if (this.subjects.length > 2) {
      throw new Error('A teacher can only teach 2 subjects.')
    }
  }
}
