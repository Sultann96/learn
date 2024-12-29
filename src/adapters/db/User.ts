import { UserModel, UserWithIdModel } from "../../models/User.model"
import { UserRepository } from "../../repositories/User.repository"
import { db } from "../../clients/db.client"

class User implements UserRepository {
  async get() {
    return db.users
  }

  async getOne(params: { id?: number; email?: string }) {
    if (!params.id && params.id !== 0 && !params.email) {
      throw new Error("Введите данные")
    }
    if (params.id || params.id === 0) {
      return db.users[params.id]
    }
    if (params.email) {
      return db.users.find((user) => user.email === params.email)
    }
  }

  async update(user: UserWithIdModel) {
    const oldUser = this.getOne({ id: user.id })

    if (!oldUser) {
      throw new Error("пользователь не найден")
    }
    const newUser = (db.users[user.id] = user)
    return newUser
  }

  async delete(id: number) {
    db.users[id].deleted = true

    return db.users[id]
  }

  async create(user: UserModel) {
    const id = db.users.length

    db.users.push({
      id,
      ...user
    })

    return db.users[id]
  }
}

export default new User()
