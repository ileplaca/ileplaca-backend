import { User } from "../users/entities/user.entity"

export type SignInResponse = {
  access_token: string,
  user: User
}