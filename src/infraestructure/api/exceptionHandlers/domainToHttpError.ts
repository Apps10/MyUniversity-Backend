import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  InternalServerErrorException as InternalServerErrorHttpException,
  ForbiddenException,
} from '@nestjs/common'
import {
  InternalServerErrorException,
  ProgramNotFoundException,
  StudentAlreadyExistException,
  StudentCantEnrollSubjectException,
  StudentNotFoundException,
  StudentUnAuthorizedException,
  SubjectAlreadyHasRegisteredTeacherException,
  SubjectNotFoundException,
  StudentAlreadyEnrolledInSubjectException,
  MaximumNumberEnrolledSubjectsReached,
  StudentCreditsAreNotAvaliablesException,
} from 'src/domain/exceptions'

export function mapDomainErrorToHttp(error: Error): HttpException {
  const errorMap: [any[], new (...args: any[]) => HttpException][] = [
    [
      [
        ProgramNotFoundException,
        SubjectNotFoundException,
        StudentNotFoundException,
      ],
      NotFoundException,
    ],
    [
      [
        StudentAlreadyExistException,
        SubjectAlreadyHasRegisteredTeacherException,
      ],
      BadRequestException,
    ],
    [[StudentUnAuthorizedException], UnauthorizedException],
    [
      [
        MaximumNumberEnrolledSubjectsReached,
        StudentAlreadyEnrolledInSubjectException,
        StudentCantEnrollSubjectException,
        StudentCreditsAreNotAvaliablesException,
      ],
      ForbiddenException,
    ],
  ]

  for (const [exceptions, HttpError] of errorMap) {
    if (exceptions.some((ex) => error instanceof ex)) {
      return new HttpError((error as any).errorMessage ?? error.message)
    }
  }

  if (error instanceof InternalServerErrorException) {
    return new InternalServerErrorHttpException(error.errorMessage)
  }

  console.error(`💣 Error UnHandled:`, error)
  return new InternalServerErrorHttpException('Unexpected error')
}
