import { IStudentPrimitive } from '../entities'

export type AuthResponse = Omit<
  IStudentPrimitive,
  'password' | 'subjects' | 'programId'
>
