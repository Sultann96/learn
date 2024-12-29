import { Response, NextFunction } from "express"
import User from "../adapters/db/User"
import { Role } from "../models/User.model"
import { RequestWithUser } from "../types"
import bcrypt from "bcrypt"
export const auth = ({
  authRequired = true,
  onlyAdmins = false
}: {
  authRequired?: boolean
  onlyAdmins?: boolean
} = {}) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authorization = req.cookies.auth

    if (!authorization && authRequired) {
      res.status(401).send("авторизуйтесь!!сук")
      return
    }else if (!authorization && !authRequired){
      next()
      return
    }

    const { id, password }: {id:number, password:string} = JSON.parse(authorization)

    if (!id && id !== 0 || !password) {
      res.status(401).send("авторизуйтесь!!сук")
      return
    }


    const user = await User.getOne({id})
    if(!user){
      res.status(404).send("пользователь не существует")
      return
    }
    const isAdmin = user.role === Role.ADMIN

    if (onlyAdmins && !isAdmin) {
      res.status(403).send("ты в администрации не работаешь")
      return
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(404).send("не правильный пароль")
    }

    req.user = { id: user.id, isAdmin}
    next()
  }
}
