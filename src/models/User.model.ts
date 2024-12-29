export enum Role {
  USER,
  ADMIN
}

export interface UserModel {
  name: string
  age?: number
  email: string
  password: string
  verifedEmail: boolean
  deleted: boolean
  role: Role
}

export interface UserWithIdModel extends UserModel {
  id: number
}
