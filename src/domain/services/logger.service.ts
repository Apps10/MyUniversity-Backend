export interface LoggerService {
  log(title: string, message: string): void
  error(title: string, errorMessage: string): void
}
