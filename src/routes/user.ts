import { Router } from "express"
import User from "../adapters/db/User"
import { RequestWithUser } from "../types"
import {
  deleteRules,
  getOneRules,
  getRules,
  updateRules
} from "../rules/user.rules"

export const userRouter = Router()

userRouter.get(
  "/user/:id",
  ...getOneRules,
  async (req: RequestWithUser, res) => {
    const id = req.params.id
    const numberId = Number(id)

    // if (isNaN(numberId)) {
    //   res.status(400).send("введите номер")
    //   return
    // }

    const user = await User.getOne({ id: numberId })

    if (!user || user.deleted) {
      res.status(404).send("пользователь не существует или удален")
      return
    }

    res.send(user)
  }
)

userRouter.get("/user", ...getRules, async (req, res) => {
  const users = await User.get()
  console.log(users);
  res.send(users.filter((user) => user && !user.deleted))
})

userRouter.put(
  "/user/:id",
  ...updateRules,
  async (req: RequestWithUser, res) => {
    const id = req.params.id
    const numberId = Number(id)
    const { name, email, password, age } = req.body
    const user = await User.getOne({ id: numberId })

    if (!user || user.deleted) {
      res.status(404).send("")
      return
    }

    // if (!name || !password) {
    //   res.status(400).send("некорректные данные")
    //   return
    // }

    // if (user.id !== req.user!.id && !req.user?.isAdmin) {
    //   return res.status(400).send("нет доступа к аккаунту")
    // }

    const userData = {
      name,
      age,
      email,
      password
    }
    const newUser = await User.update({ ...user, ...userData })
    res.status(202).send(newUser)
    return
  }
)

userRouter.delete(
  "/user/:id",
  ...deleteRules,
  async (req: RequestWithUser, res) => {
    const id = req.params.id
    const numberId = Number(id)
    const user = await User.getOne({ id: numberId })
    if (!user || user.deleted) {
      res.status(404).send("пользователь не существует")
      return
    }
   

    if (user.id !== req.user!.id && !req.user?.isAdmin) {
      return res.status(400).send("нет доступа к аккаунту")
    }

    await User.delete(numberId)

    res.status(200).send({ id: user.id })
    return
  }
)
