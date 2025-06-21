import { IStudentPrimitive } from 'src/domain/entities'

export type RegisterStudentDto = IStudentPrimitive
export type LoginStudentDto = Pick<IStudentPrimitive, 'email' | 'password'>
