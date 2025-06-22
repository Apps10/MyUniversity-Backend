import { customExceptionMaker } from 'src/shared/exceptions'

export const InternalServerErrorException = customExceptionMaker(
  'InternalServerErrorException',
  'Internal Server Error',
)
