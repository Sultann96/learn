import User from "../adapters/db/User";
import { UserWithIdModel } from "../models/User.model";
import { BadRequestError, NotFoundError } from "./errors";
import bcrypt from "bcrypt"

class UserService {
  async userGetOne(id: number): Promise<UserWithIdModel> {

    const user = await User.getOne({ id })

    if (!user || user.deleted) {
      throw new NotFoundError({ message: "пользователь не существует или удален" })
    }

    return user
  }

  async get(): Promise<UserWithIdModel[]> {
    const users = await User.get()
    return users
  }

  async update({age,email,id,name,password}:{id: number, name: string, email: string, age: number, password: string}): Promise<UserWithIdModel> {

    const user = await User.getOne({ id })

    if (!user || user.deleted) {
      throw new NotFoundError({ message: "Пользователь удален или не найден" })
    }
    console.log(password);
    password = await bcrypt.hash(password, 7)
    console.log(password);
    
    const userData = {
      name,
      age,
      email,
      password
    }
    const newUser = await User.update({ ...user, ...userData })
    
    return newUser
  }
  async delete(id: number, myUserId: number, isAdmin: boolean) {
    const user = await User.getOne({ id })

    if (!user || user.deleted) {
      throw new NotFoundError({ message: "пользователь не существует" })
    }


    if (user.id !== myUserId && !isAdmin) {
      throw new BadRequestError({ message: "нет доступа к аккаунту" })
    }

    await User.delete(id)

    return  user.id 
  }
}
export default new UserService()