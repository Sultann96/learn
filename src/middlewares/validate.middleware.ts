import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    return next()
  }

  return res.send({ errors: result.array() })
}
