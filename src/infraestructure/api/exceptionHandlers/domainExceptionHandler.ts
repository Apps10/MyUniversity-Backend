import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { mapDomainErrorToHttp } from './domainToHttpError'

@Catch()
export class DomainExceptionHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    let error = exception as Error

    if (!(error instanceof HttpException)) {
      error = mapDomainErrorToHttp(error)
    }

    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      error instanceof HttpException
        ? ((error.getResponse() as any)?.message ?? error.message)
        : error.message

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
    })
  }
}
