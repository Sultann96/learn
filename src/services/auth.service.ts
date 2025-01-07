import Code from "../adapters/db/Code"
import User from "../adapters/db/User"
import mailer from "../clients/nodemailer.client"
import crypto from "crypto"
import bcrypt from "bcrypt"
import { Role, UserWithIdModel } from "../models/User.model"
import { BadRequestError, NotFoundError, UnauthorizatedError } from "./errors"

class AuthService {
  async code({ email }: { email: string }): Promise<{ message: string }> {
    const codeToEmail = crypto.randomBytes(2).toString("hex")
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
    return { message: "Проверьте почту" }
  }

  async authMe({ email, password }: { email: string, password: string }): Promise<UserWithIdModel> {
    const user = await User.getOne({ email })

    if (!user) {
      throw new NotFoundError({ message: "такого юзера не существует" })
    }

    if (!user?.verifedEmail) {
      throw new BadRequestError({ message: "Аккаунт не верифицирован" })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new NotFoundError({ message: "Не правильный пароль" })
    }

    await mailer({
      to: email,
      subject: "уведомление",
      text: `Выполнен вход в аккаунт ${email}`
    })
    return user
  }
  async authRegistr({ name, email, password, age, code }:
    { name: string, email: string, password: string, age: number, code: string }): Promise<UserWithIdModel> {
    const users = await User.getOne({ email })

    if (users) {
      throw new UnauthorizatedError({ message: "Такой емейл уже существует:undefined" })
    }

    const hashPass = await bcrypt.hash(password, 7)
    const codeFromBd = await Code.getOne({ email })

    if (!codeFromBd) {
      throw new BadRequestError({ message: "введите корректный email" })
    }

    if (code !== codeFromBd!.code) {
      throw new BadRequestError({ message: "не правильный код" })
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
      throw new BadRequestError({ message: "не правильный код" })
    }
    await mailer({
      to: email,
      subject: "уведомление",
      text: "Аккаунт создан "
    })


    if (user.id === 0) {
      user.role = Role.ADMIN
      await User.update(user)
    }
    return user
  }
}
export default new AuthService()