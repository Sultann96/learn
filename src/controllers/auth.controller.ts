import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { UserWithIdModel } from "../models/User.model";


class authController {
  async code(req: Request, res: Response) {

    const message = await AuthService.code({ email: req.body.email })

    return res.status(201).json(message)

  }

  async me(req: Request, res: Response<{user: UserWithIdModel}>) {
    const { email, password } = req.body
    const user = await AuthService.authMe({ email, password })

    return res.status(200).send({ user })
  }
  async registr(req: Request, res: Response) {
    const {name, email, password, age, code} = req.body
    
   }
}
export default new authController()

