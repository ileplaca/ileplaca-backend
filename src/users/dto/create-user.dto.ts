import { MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
  @MinLength(6)
  @MaxLength(30)
  username: string

  @MinLength(6)
  @MaxLength(50)
  email: string

  @MinLength(6)
  @MaxLength(50)
  password: string
}
