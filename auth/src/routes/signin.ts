import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '@gptickethub/common'
import { checkValidationErrors } from '@gptickethub/common'
import { User } from '../models/user'
import { Password } from '../services/password'

// Init validation

const validation = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage("Password can't be empty"),
]

const processRequest = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    throw new BadRequestError('Wrong email or password')
  }
  const isMatch = await Password.compare(existingUser.password, password)
  if (!isMatch) {
    throw new BadRequestError('Wrong email or password')
  }

  const userJwt = jwt.sign(
    {
      id: existingUser._id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,
  )
  req.session = {
    jwt: userJwt,
  }

  res.status(200).send(existingUser)
}

const router = express.Router()
router.post(
  '/api/users/signin',
  validation,
  checkValidationErrors,
  processRequest,
)

export { router as signinRouter } // renaming
