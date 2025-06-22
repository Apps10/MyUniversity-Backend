export const customExceptionMaker = function (
  exceptionName: string,
  defaultErrorMessage: string,
) {
  return class extends Error {
    errorMessage: string
    constructor(optionalErrorMessage?: string) {
      super(exceptionName)
      this.errorMessage = optionalErrorMessage ?? defaultErrorMessage
    }
  }
}
