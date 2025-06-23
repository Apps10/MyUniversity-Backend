import { Subject } from '../entities'
import { GenericRepository } from './generic.repository'

export const SUBJECT_REPOSITORY = Symbol('SubjectRepository')
export type SubjectRepository = GenericRepository<Subject>
