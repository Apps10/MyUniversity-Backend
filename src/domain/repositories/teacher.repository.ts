import { Teacher } from '../entities'
import { GenericRepository } from './generic.repository'

export const TEACHER_REPOSITORY = Symbol('TeacherRepository')
export type TeacherRepository = GenericRepository<Teacher>
