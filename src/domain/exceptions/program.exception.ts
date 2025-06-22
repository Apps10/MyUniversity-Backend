import { customExceptionMaker } from 'src/shared/exceptions'

export const ProgramNotFoundException = customExceptionMaker(
  'ProgramNotFoundException',
  'Program not found',
)
