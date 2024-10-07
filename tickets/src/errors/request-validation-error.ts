import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(public validationErrors: ValidationError[]) {
    super('Invalid request parameters')
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  get serializedErrors() {
    return this.validationErrors.map((validatonError) => {
      if (validatonError.type === 'field') {
        return { message: validatonError.msg, field: validatonError.path }
      }
      return { message: validatonError.msg }
    })
  }
}
