import { IProgramPrimitive, Program } from '../entities'

export class ProgramFactory {
  static fromPrimitives({ id, name, totalCredits }: IProgramPrimitive) {
    return new Program(id, name, totalCredits)
  }

  static fromArrayPrimitive(programs: IProgramPrimitive[]) {
    return programs.map((p) => this.fromPrimitives(p))
  }
}
