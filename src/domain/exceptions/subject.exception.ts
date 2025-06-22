import { customExceptionMaker } from 'src/shared/exceptions/exceptionMaker'

export const SubjectNotFoundException = customExceptionMaker(
  'SubjectNotFoundException',
  'Subject not found',
)

export const SubjectAlreadyHasRegisteredTeacherException = customExceptionMaker(
  'SubjectAlreadyHasRegisteredTeacherException',
  'student has the maximum subjects',
)
