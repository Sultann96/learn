import { CodeWithIdModel } from "../models/Code.model"
import { UserWithIdModel } from "../models/User.model"

export const db: {
  users: UserWithIdModel[]
  codes: CodeWithIdModel[]
} = {
  users: [],
  codes: []
}
