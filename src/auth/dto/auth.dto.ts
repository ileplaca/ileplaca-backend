import { MaxLength, MinLength } from "class-validator"

export class SignIntDto {
  @MinLength(6)
  @MaxLength(50)
  username: string

  @MinLength(6)
  @MaxLength(50)
  password: string
}
