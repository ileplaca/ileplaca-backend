import { MaxLength } from "class-validator"

export class FindByNameAndLocationDto {
  @MaxLength(200)
  name: string

  @MaxLength(200)
  location: string
}
