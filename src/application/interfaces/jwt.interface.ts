import { IStudentPrimitive } from 'src/domain/entities'

export type JwtPayload = Omit<IStudentPrimitive, 'password'>
