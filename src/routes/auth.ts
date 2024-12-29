import { Router } from "express"
import User from "../adapters/db/User"
import bcrypt from "bcrypt"
import { Role } from "../models/User.model"
import mailer from "../clients/nodemailer.client"
import { config } from "dotenv"
import crypto from "crypto"
import Code from "../adapters/db/Code"
import { authCodeRules, loginRules, registrRules } from "../rules/auth.rules"

config()
export const authRouter = Router()

authRouter.post("/auth/code", ...authCodeRules, async (req, res) => {
  const codeToEmail = crypto.randomBytes(2).toString("hex")
  const { email } = req.body
  await Code.updateMany({ email }, { disabled: true })

  await Code.create({
    email,
    code: codeToEmail,
    disabled: false
  })
  await mailer({
    to: email,
    subject: "Код для авторизации",
    text: `Введите код для входа ,${codeToEmail}`
  })
  return res.status(201).send("Проверьте почту")
})

authRouter.post("/auth/me", ...loginRules, async (req, res) => {
  const { email, password } = req.body

  const user = await User.getOne({ email })
  
  if (!user) {
    return res.status(404).send("ошибка")
  }
  
  if (!user?.verifedEmail) {
    return res.status(400).send("не верифицированный емайл")
  }
  
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(404).send("не правильный пароль")
  }

  await mailer({
    to: email,
    subject: "уведомление",
    text: `Выполнен вход в аккаунт ${email}`
  })
  res.status(200).send({ user })
  return
})

authRouter.post("/auth/registr", ...registrRules, async function (req, res) {
  const { name, email, password, age, code } = req.body

  const users = await User.getOne({ email })
  if (users) {
    return res.status(401).send("такой email уже существует : undefined")
  }

  const hashPass = await bcrypt.hash(password, 7)
  const codeFromBd = await Code.getOne({ email })
  if (!codeFromBd) {
    return res.status(400).send("введите корректный email")
  }
  if (code !== codeFromBd!.code) {
    return res.status(400).send("не правильный код")
  }

  const user = await User.create({
    name,
    email,
    password: hashPass,
    age,
    verifedEmail: true,
    deleted: false,
    role: Role.USER
  })
  if (!Code.disable(user.id)) {
    res.status(400).send("код неверный")
  }
  await mailer({
    to: email,
    subject: "уведомление",
    text: "Аккаунт создан ахахаххах"
  })

  if (user.id !== 0) {
    return res.status(201).send({ user })
  }

  if (user.id === 0) {
    user.role = Role.ADMIN
    await User.update(user)
    return res.status(201).send({ user })
  }
})
