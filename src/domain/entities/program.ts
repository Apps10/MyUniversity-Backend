export interface IProgramPrimitive {
  id: string
  name: string
  totalCredits?: number
}

export class Program {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly totalCredits: number = 9,
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
      (this.name.length < 2 && this.name.length > 20) ||
      typeof this.name != 'string'
    ) {
      throw new Error('name must be a string between 2 and 20 characters')
    }

    if (this.totalCredits !== 9) {
      throw new Error('totalCredits must be a 9')
    }
  }
}
