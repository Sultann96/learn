import { CodeWithIdModel } from "../models/Code.model"
import { Role, UserWithIdModel } from "../models/User.model"

export const db: {
  users: UserWithIdModel[]
  codes: CodeWithIdModel[]
} = {
  users: [{
    "name":'s',
    "email":"radjabovs96@mail.ru",
    "age":22,
    deleted:false,
    id:0,
    password:"$2b$07$tdNWmCBN6mN0XS6N1VZE.OK6OMYcfGYS88b4q7QV34oE6qkUMhVKa",
    role:Role.ADMIN,
    verifedEmail:true
  }],
  codes: []
}
