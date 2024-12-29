import { UserModel, UserWithIdModel } from "../models/User.model"

export interface UserRepository {
  getOne: (params:{id: number, email: string}) => Promise<UserWithIdModel | undefined>
  get: () => Promise<UserWithIdModel[]>
  create: (user: UserModel) => Promise<UserWithIdModel>
  update: (user: UserWithIdModel) => Promise<UserWithIdModel>
  delete: (id: number) => Promise<UserWithIdModel | undefined>
}
  