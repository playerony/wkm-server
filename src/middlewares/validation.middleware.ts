import { RequestHandler } from 'express'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

import HttpException from '../exceptions/HttpException'

const validationMiddleware = (type: any, value: string | 'body' | 'query' | 'params' = 'body', skipMissingProperties = false): RequestHandler => (
  req,
  res,
  next
) => {
  validate(plainToClass(type, req[value]), { skipMissingProperties }).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ')

      next(new HttpException(400, message))
    } else {
      next()
    }
  })
}

export default validationMiddleware
