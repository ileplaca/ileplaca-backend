import { MaxLength } from "class-validator"

export class CreatePostDto {
  @MaxLength(500)
  title: string

  @MaxLength(5000)
  description: string
}
