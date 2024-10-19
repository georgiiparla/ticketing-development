import express from 'express'
import { Request, Response } from 'express'

import { setCurrentUserIfJwt } from '@gptickethub/common'
import { confirmCurrentUser } from '@gptickethub/common'

const router = express.Router()

const processRequest = (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser!}) // Always defined because, if  it is not, the error-middleware will be triggered
}

router.get(
  '/api/users/currentuser',
  setCurrentUserIfJwt,
  confirmCurrentUser,
  processRequest,
)

export { router as currentUserRouter } // renaming
