import { Request, Response } from "express";
import userService from "../services/user.service";
import { RequestWithUser } from "../types";

class userController {
  async getOne(req: Request, res: Response) {
    const id = req.params.id
    const numberId = Number(id)
    const user = await userService.userGetOne(numberId)

    return res.status(200).json(user)
  }

  async get(req: Request, res: Response) {
    const users = await userService.get()
    return res.json(users.filter((user: { deleted: any; }) => user && !user.deleted))
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    let { name, email, password, age } = req.body
   
    const user = await userService.update({id, name, email, password, age})
   
    return res.status(200).json(user)
  }

  async delete(req: RequestWithUser, res: Response) {
    const id = Number(req.params.id)
    const myUserId = req.user!.id
    const isAdmin = req.user!.isAdmin
    const userId = await userService.delete(id, myUserId, isAdmin)

    res.status(200).json(id)
  }
}

export default new userController()