import jwt from 'jsonwebtoken'
import { NextFunction, Response, Request } from 'express'

import HttpException from '../exceptions/HttpException'
import { DataStoredInToken } from '../interfaces/auth.interface'

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorizationKey = req.headers["authorization-key"]

    if (authorizationKey) {
      const secret = process.env.JWT_SECRET
      const verificationResponse: DataStoredInToken = await jwt.verify(authorizationKey, secret)
      const code = verificationResponse.code

      if (code === process.env.EMAIL_LOGIN) {
        next()
      } else {
        next(new HttpException(401, 'Wrong authentication token'))
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'))
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'))
  }
}

export default authMiddleware
