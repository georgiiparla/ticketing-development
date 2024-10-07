import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '../errors/bad-request-error'
import { checkValidationErrors } from '../middlewares/check-validation-errors'
import { User } from '../models/user'

const validation = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
]

const processRequest = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existingModel = await User.findOne({ email })
  if (existingModel) {
    throw new BadRequestError('Email in use', 'email')
  }

  const user = User.build({ email, password })
  await user.save()

  const userJwt = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY!,
  )
  req.session = {
    jwt: userJwt,
  }

  res.status(201).send(user)
}

const router = express.Router()
router.post(
  '/api/users/signup',
  validation,
  checkValidationErrors,
  processRequest,
)

export { router as signupRouter } // renaming
