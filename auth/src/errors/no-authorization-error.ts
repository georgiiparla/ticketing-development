import { CustomError } from './custom-error'

export class NoAuthorizationError extends CustomError {
  statusCode = 401

  constructor() {
    super('Not Authorized')
    Object.setPrototypeOf(this, NoAuthorizationError.prototype)
  }

  get serializedErrors() {
    return [{ message: 'Not Authorized' }]
  }
}
