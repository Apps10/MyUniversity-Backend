import { IStudentPrimitive } from 'src/domain/entities'

export interface RegisterStudentDto
  extends Omit<IStudentPrimitive, 'subjects' | 'program' | 'avaliableCredits'> {
  programId: string
}
export type LoginStudentDto = Pick<IStudentPrimitive, 'email' | 'password'>
