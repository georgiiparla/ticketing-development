import express from 'express'
import { Request, Response } from 'express'

import { setCurrentUserIfJwt } from '../middlewares/set-current-user-if-jwt'
import { checkCurrentUser } from '../middlewares/check-current-user'

const router = express.Router()

const processRequest = (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser!}) // Always defined because, if  it is not, the error-middleware will be triggered
}

router.get(
  '/api/users/currentuser',
  setCurrentUserIfJwt,
  checkCurrentUser,
  processRequest,
)

export { router as currentUserRouter } // renaming
