import { CustomError } from './custom-error'

export class BadRequestError extends CustomError {
  statusCode = 400

  constructor(message: string, public field='') {
    super(message)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  get serializedErrors() {
    return [{ message: this.message, field: this.field }]
  }
}
