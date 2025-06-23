import { customExceptionMaker } from 'src/shared/exceptions/exceptionMaker'

export const SubjectNotFoundException = customExceptionMaker(
  'SubjectNotFoundException',
  'Subject not found',
)

export const SubjectAlreadyHasRegisteredTeacherException = customExceptionMaker(
  'SubjectAlreadyHasRegisteredTeacherException',
  'student already has this teacher enrolled',
)

export const MaximumNumberEnrolledSubjectsReached = customExceptionMaker(
  'MaximumNumberEnrolledSubjectsReached',
  'maximum number of enrolled subjects reached',
)
