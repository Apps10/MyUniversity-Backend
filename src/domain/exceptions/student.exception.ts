import { customExceptionMaker } from 'src/shared/exceptions/exceptionMaker'

export const StudentNotFoundException = customExceptionMaker(
  'StudentNotFoundException',
  'Student not found',
)

export const StudentAlreadyExistException = customExceptionMaker(
  'StudentAlreadyExistException',
  'student already exist',
)

export const StudentUnAuthorizedException = customExceptionMaker(
  'StudentUnAuthorizedException',
  'credentials are invalid',
)

export const StudentCantEnrollSubjectException = customExceptionMaker(
  'StudentCantEnrollSubjectException',
  'the subject already has a registered teacher',
)
