export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract get serializedErrors(): {
    message: string
    [key: string]: any
  }[]
}
