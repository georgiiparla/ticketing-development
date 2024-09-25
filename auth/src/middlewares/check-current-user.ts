import { Request, Response, NextFunction } from 'express'
import { NoAuthorizationError } from '../errors/no-authorization-error'

export const checkCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NoAuthorizationError()
  }
  next()
}
