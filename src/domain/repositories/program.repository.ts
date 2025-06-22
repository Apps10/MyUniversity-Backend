import { Program } from '../entities'
import { GenericRepository } from './generic.repository'

export const PROGRAM_REPOSITORY = Symbol('ProgramRepository')
export type ProgramRepository = GenericRepository<Program>
